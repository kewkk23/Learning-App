import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import GlobalApi from '@/api/GlobalApi';


const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
const webhookSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET;

export async function POST(req) {

    const body = await req.text();

    const signature = headers().get('stripe-signature');

    let data;
    let eventType;
    let event;

    // verify Stripe event is legit
    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
        console.error(`Webhook signature verification failed. ${err.message}`);
        return NextResponse.json({ error: err.message }, { status: 400 });
    }

    data = event.data;
    eventType = event.type;

    try {
        switch (eventType) {
            case 'checkout.session.completed': {
                // Pierwsza płatność zakończona sukcesem i utworzono subskrypcję
                const session = await stripe.checkout.sessions.retrieve(
                    data.object.id,
                    {
                        expand: ['line_items']
                    }
                );

                const customerId = session?.customer;
                const customer = await stripe.customers.retrieve(customerId);

                const customerEmail = customer.email; // Uzyskaj email klienta
                const priceId = session?.line_items?.data[0]?.price.id;

                // Zmień subskrypcję na podstawie adresu e-mail
                GlobalApi.ChangeSubscription(customerEmail);
            }




        }
    } catch (e) {
        console.error(
            'stripe error: ' + e.message + ' | EVENT TYPE: ' + eventType
        );
    }

    return NextResponse.json({});
}