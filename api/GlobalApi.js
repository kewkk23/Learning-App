import { GoogleGenerativeAI } from "@google/generative-ai"
import axios from "axios"
const axiosClient = axios.create({
    baseURL: 'https://learning-app-admin.onrender.com/api',
    headers: {
        'Authorization': 'Bearer ' + process.env.NEXT_PUBLIC_STRAPI_API_KEY
    }
})


const GetUserInfo = (email) => axiosClient.get('user-lists?filters[email][$eq]=' + email)

const CreateNewUser = (data) => axiosClient.post('user-lists', { data: data })

const GetUserCourses = (email) => axiosClient.get('user-coursess?filters[userEmail][$eq]=' + email)

const GetSubscriptionInfo = (email) => axiosClient.get(`user-lists?filters[email][$eq]=${email}`)

const saveCourseInStripe = (data) => axiosClient.post('user-coursess', { data: data })

const ChangeSubscription = async (email) => {
    try {
        // Get user data by email
        const response = await axiosClient.get(`user-lists?filters[email][$eq]=${email}`);
        const user = response.data.data?.[0].documentId;

        if (user) {

            // Update subscription for the user
            const updateResponse = await axiosClient.put(`user-lists/${user}`, {
                data: { Subscription: true }
            });


            console.log('Subscription updated successfully:', updateResponse.data);
        } else {
            console.log('User not found');
        }
    } catch (error) {
        console.error('Error updating subscription:', error);
    }
};



const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};


export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Stwórz szczegółowy kurs nauki języka angielskiego dla poziomu podstawowego na 7 dni. Każdy dzień kursu powinien zawierać:\n1. Praktyczne zwroty wraz z tłumaczeniami i wymową.\n2. Krótkie dialogi, które można wykorzystać w codziennych sytuacjach (np. w sklepie, restauracji, na lotnisku).\n3. Wyjaśnienie podstawowych zasad gramatycznych.\n4. Listę miejsc, które warto odwiedzić, znając ten język, oraz jak się tam komunikować.\n5. Zadania praktyczne, które pomogą uczestnikowi kursu ćwiczyć nowo nabyte umiejętności.\n6. Ciekawostki kulturowe związane z językiem.\nProszę o wygenerowanie kursu w formacie JSON, gdzie każdy dzień jest osobnym obiektem." },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n[\n  {\n    \"day\": 1,\n    \"title\": \"Greetings and Introductions\",\n    \"phrases\": [\n      { \"phrase\": \"Hello.\", \"translation\": \"Cześć.\", \"pronunciation\": \"/həˈloʊ/\" },\n      { \"phrase\": \"Good morning.\", \"translation\": \"Dzień dobry.\", \"pronunciation\": \"/ɡʊd ˈmɔːrnɪŋ/\" },\n      { \"phrase\": \"Good afternoon.\", \"translation\": \"Dobry dzień.\", \"pronunciation\": \"/ɡʊd ˈæftərˈnuːn/\" },\n      { \"phrase\": \"Good evening.\", \"translation\": \"Dobry wieczór.\", \"pronunciation\": \"/ɡʊd ˈiːvnɪŋ/\" },\n      { \"phrase\": \"How are you?\", \"translation\": \"Jak się masz?\", \"pronunciation\": \"/haʊ ɑːr juː/\" },\n      { \"phrase\": \"I'm fine, thank you.\", \"translation\": \"Dobrze, dziękuję.\", \"pronunciation\": \"/aɪm faɪn θæŋk juː/\" },\n      { \"phrase\": \"What's your name?\", \"translation\": \"Jak masz na imię?\", \"pronunciation\": \"/wʌts jɔːr neɪm/\" },\n      { \"phrase\": \"My name is...\", \"translation\": \"Nazywam się...\", \"pronunciation\": \"/maɪ neɪm ɪz...\" }\n    ],\n    \"dialogues\": [\n      {\n        \"scene\": \"Meeting someone for the first time\",\n        \"dialogue\": \"A: Hello, my name is John. \\nB: Nice to meet you, John. I'm Mary. \\n A: How are you today, Mary? \\nB: I'm fine, thank you. And you?\"\n      }\n    ],\n    \"grammar\": {\n      \"topic\": \"Present Simple\",\n      \"explanation\": \"The present simple tense is used for actions that happen regularly or are always true. For example: 'I eat breakfast every morning.' 'The sun rises in the east.'\"\n    },\n    \"places\": {\n      \"title\": \"Visiting a Cafe\",\n      \"phrases\": [\n        { \"phrase\": \"Can I get a coffee, please?\", \"translation\": \"Czy mogę dostać kawę, proszę?\", \"pronunciation\": \"/kæn aɪ ɡɛt ə ˈkɑːfiː pliːz/\" },\n        { \"phrase\": \"What kind of coffee do you have?\", \"translation\": \"Jakie rodzaje kawy mają Państwo?\", \"pronunciation\": \"/wʌt kaɪnd ʌv ˈkɑːfiː duː juː hæv/\" },\n        { \"phrase\": \"I'd like a slice of cake, please.\", \"translation\": \"Chciałbym/abym kawałek ciasta, proszę.\", \"pronunciation\": \"/aɪd laɪk ə slaɪs ʌv keɪk pliːz/\" }\n      ]\n    },\n    \"tasks\": [\n      { \"task\": \"Introduce yourself to a friend and ask them how they are.\" },\n      { \"task\": \"Write a short paragraph about your daily routine using the present simple tense.\" }\n    ],\n    \"culture\": {\n      \"title\": \"British vs. American English\",\n      \"content\": \"English is spoken in many countries around the world, but there are some differences between British and American English. For example, in British English, people say 'colour' and 'centre', while in American English, they say 'color' and 'center'.\"\n    }\n  },\n  {\n    \"day\": 2,\n    \"title\": \"Basic Questions and Answers\",\n    \"phrases\": [\n      { \"phrase\": \"Where are you from?\", \"translation\": \"Skąd jesteś?\", \"pronunciation\": \"/wɛr ɑːr juː frʌm/\" },\n      { \"phrase\": \"I'm from...\", \"translation\": \"Jestem z...\", \"pronunciation\": \"/aɪm frʌm...\" },\n      { \"phrase\": \"What do you do?\", \"translation\": \"Czym się zajmujesz?\", \"pronunciation\": \"/wʌt duː juː duː/\" },\n      { \"phrase\": \"I'm a...\", \"translation\": \"Jestem...\", \"pronunciation\": \"/aɪm ə...\" },\n      { \"phrase\": \"How old are you?\", \"translation\": \"Ile masz lat?\", \"pronunciation\": \"/haʊ oʊld ɑːr juː/\" },\n      { \"phrase\": \"I'm...\", \"translation\": \"Mam...\", \"pronunciation\": \"/aɪm...\" },\n      { \"phrase\": \"Do you have any hobbies?\", \"translation\": \"Masz jakieś hobby?\", \"pronunciation\": \"/duː juː hæv ˈɛni ˈhɑːbiz/\" },\n      { \"phrase\": \"Yes, I like...\", \"translation\": \"Tak, lubię...\", \"pronunciation\": \"/jɛs aɪ laɪk...\" }\n    ],\n    \"dialogues\": [\n      {\n        \"scene\": \"Meeting someone at a party\",\n        \"dialogue\": \"A: Hello, I'm Lisa. Nice to meet you. \\nB: Hi Lisa, I'm David. Nice to meet you too. Where are you from? \\nA: I'm from Spain. What about you? \\nB: I'm from the UK. Do you like it here?\"\n      }\n    ],\n    \"grammar\": {\n      \"topic\": \"Question Words\",\n      \"explanation\": \"Question words are used to ask questions. Some common question words are: 'who', 'what', 'where', 'when', 'why', and 'how'.\"\n    },\n    \"places\": {\n      \"title\": \"Visiting a Supermarket\",\n      \"phrases\": [\n        { \"phrase\": \"Where can I find the bread?\", \"translation\": \"Gdzie mogę znaleźć chleb?\", \"pronunciation\": \"/wɛr kæn aɪ faɪnd ðə brɛd/\" },\n        { \"phrase\": \"Excuse me, how much is this?\", \"translation\": \"Przepraszam, ile to kosztuje?\", \"pronunciation\": \"/ɪkˈskjuːz miː haʊ mʌtʃ ɪz ðɪs/\" },\n        { \"phrase\": \"I'd like to pay, please.\", \"translation\": \"Chciałbym/abym zapłacić, proszę.\", \"pronunciation\": \"/aɪd laɪk tuː peɪ pliːz/\" }\n      ]\n    },\n    \"tasks\": [\n      { \"task\": \"Ask a friend five questions about themselves using the question words you learned.\" },\n      { \"task\": \"Write a short conversation between two people meeting for the first time.\" }\n    ],\n    \"culture\": {\n      \"title\": \"British Slang\",\n      \"content\": \"British English is known for its slang words, which are informal words or phrases. Some examples include: 'cheers' (thank you), 'mate' (friend), and 'brilliant' (very good).\"\n    }\n  },\n  {\n    \"day\": 3,\n    \"title\": \"Talking About Yourself\",\n    \"phrases\": [\n      { \"phrase\": \"I live in...\", \"translation\": \"Mieszkam w...\", \"pronunciation\": \"/aɪ lɪv ɪn...\" },\n      { \"phrase\": \"I work as a...\", \"translation\": \"Pracuję jako...\", \"pronunciation\": \"/aɪ wɜːrk æz ə...\" },\n      { \"phrase\": \"I enjoy...\", \"translation\": \"Lubie...\", \"pronunciation\": \"/aɪ ɪnˈdʒɔɪ...\" },\n      { \"phrase\": \"My favorite color is...\", \"translation\": \"Mój ulubiony kolor to...\", \"pronunciation\": \"/maɪ ˈfeɪvərɪt ˈkʌlər ɪz...\" },\n      { \"phrase\": \"I have a...\", \"translation\": \"Mam...\", \"pronunciation\": \"/aɪ hæv ə...\" },\n      { \"phrase\": \"I like to...\", \"translation\": \"Lubię...\", \"pronunciation\": \"/aɪ laɪk tuː...\" },\n      { \"phrase\": \"I don't like...\", \"translation\": \"Nie lubię...\", \"pronunciation\": \"/aɪ doʊnt laɪk...\" },\n      { \"phrase\": \"I'm interested in...\", \"translation\": \"Jestem zainteresowany/a...\", \"pronunciation\": \"/aɪm ˈɪntrəstɪd ɪn...\" }\n    ],\n    \"dialogues\": [\n      {\n        \"scene\": \"Small talk with a colleague\",\n        \"dialogue\": \"A: Hey, how was your weekend? \\nB: It was good, thanks. I went to the beach with my family. What about you? \\nA: I stayed at home and watched movies. I'm kind of a homebody. What do you like to do in your free time? \\nB: I like to read and go hiking. It's good to get some fresh air.\"\n      }\n    ],\n    \"grammar\": {\n      \"topic\": \"Plural Nouns\",\n      \"explanation\": \"Plural nouns are used to talk about more than one thing. To form the plural of most nouns, you add -s to the end of the word. For example: 'book' becomes 'books', 'cat' becomes 'cats'. However, some nouns have irregular plurals, such as 'child' becoming 'children'.\"\n    },\n    \"places\": {\n      \"title\": \"Visiting a Museum\",\n      \"phrases\": [\n        { \"phrase\": \"Where is the entrance?\", \"translation\": \"Gdzie jest wejście?\", \"pronunciation\": \"/wɛr ɪz ði ˈɛntrəns/\" },\n        { \"phrase\": \"What's the name of this painting?\", \"translation\": \"Jak nazywa się ten obraz?\", \"pronunciation\": \"/wʌts ðə neɪm ʌv ðɪs ˈpeɪntɪŋ/\" },\n        { \"phrase\": \"Can I take a photo?\", \"translation\": \"Czy mogę zrobić zdjęcie?\", \"pronunciation\": \"/kæn aɪ teɪk ə ˈfoʊtoʊ/\" }\n      ]\n    },\n    \"tasks\": [\n      { \"task\": \"Write a short paragraph about yourself, including your hobbies, interests, and favorite things.\" },\n      { \"task\": \"Practice talking about yourself in front of a mirror or with a friend.\" }\n    ],\n    \"culture\": {\n      \"title\": \"American Slang\",\n      \"content\": \"American English also has its own slang words. Some examples include: 'cool' (good), 'awesome' (great), and 'dude' (friend).\"\n    }\n  },\n  {\n    \"day\": 4,\n    \"title\": \"Basic Shopping\",\n    \"phrases\": [\n      { \"phrase\": \"I'm looking for...\", \"translation\": \"Szukam...\", \"pronunciation\": \"/aɪm ˈlʊkɪŋ fɔːr...\" },\n      { \"phrase\": \"Do you have this in a different size?\", \"translation\": \"Czy macie to w innym rozmiarze?\", \"pronunciation\": \"/duː juː hæv ðɪs ɪn ə ˈdɪfərənt saɪz/\" },\n      { \"phrase\": \"How much is it?\", \"translation\": \"Ile to kosztuje?\", \"pronunciation\": \"/haʊ mʌtʃ ɪz ɪt/\" },\n      { \"phrase\": \"Can I try this on?\", \"translation\": \"Czy mogę to przymierzyć?\", \"pronunciation\": \"/kæn aɪ traɪ ðɪs ɔːn/\" },\n      { \"phrase\": \"I'll take it.\", \"translation\": \"Biorę to.\", \"pronunciation\": \"/aɪl teɪk ɪt/\" },\n      { \"phrase\": \"I'd like to pay with cash/card.\", \"translation\": \"Chciałbym/abym zapłacić gotówką/kartą.\", \"pronunciation\": \"/aɪd laɪk tuː peɪ wɪθ kæʃ/kɑːrd/\" }\n    ],\n    \"dialogues\": [\n      {\n        \"scene\": \"Buying a shirt at a clothing store\",\n        \"dialogue\": \"A: Excuse me, I'm looking for a blue shirt. \\nB: Sure, we have some over there. What size are you looking for? \\nA: I'm a medium. \\nB: Okay, here are some options. You can try them on in the fitting room.\"\n      }\n    ],\n    \"grammar\": {\n      \"topic\": \"Possessive Adjectives\",\n      \"explanation\": \"Possessive adjectives are used to show that something belongs to someone. Examples include: 'my', 'your', 'his', 'her', 'its', 'our', and 'their'.\"\n    },\n    \"places\": {\n      \"title\": \"Visiting a Market\",\n      \"phrases\": [\n        { \"phrase\": \"What kind of fruit do you have today?\", \"translation\": \"Jakie owoce mają Państwo dzisiaj?\", \"pronunciation\": \"/wʌt kaɪnd ʌv fruːt duː juː hæv təˈdeɪ/\" },\n        { \"phrase\": \"Can I have a kilo of apples, please?\", \"translation\": \"Czy mogę dostać kilogram jabłek, proszę?\", \"pronunciation\": \"/kæn aɪ hæv ə ˈkiːloʊ ʌv ˈæpəlz pliːz/\" },\n        { \"phrase\": \"How much does this cost?\", \"translation\": \"Ile to kosztuje?\", \"pronunciation\": \"/haʊ mʌtʃ dʌz ðɪs kɑːst/\" }\n      ]\n    },\n    \"tasks\": [\n      { \"task\": \"Write a dialogue between a customer and a shop assistant buying a new book.\" },\n      { \"task\": \"Role-play a conversation at a market, buying some vegetables.\" }\n    ],\n    \"culture\": {\n      \"title\": \"American Food Culture\",\n      \"content\": \"American food culture is diverse and includes a wide range of cuisines. Some popular American dishes include hamburgers, pizza, and tacos.\"\n    }\n  },\n  {\n    \"day\": 5,\n    \"title\": \"Eating Out\",\n    \"phrases\": [\n      { \"phrase\": \"A table for...\", \"translation\": \"Stolik dla...\", \"pronunciation\": \"/ə ˈteɪbəl fɔːr...\" },\n      { \"phrase\": \"Can I see the menu, please?\", \"translation\": \"Czy mogę zobaczyć menu, proszę?\", \"pronunciation\": \"/kæn aɪ siː ðə ˈmɛnjuː pliːz/\" },\n      { \"phrase\": \"I'd like to order...\", \"translation\": \"Chciałbym/abym zamówić...\", \"pronunciation\": \"/aɪd laɪk tuː ˈɔːrdər...\" },\n      { \"phrase\": \"What would you recommend?\", \"translation\": \"Co by Pan/Pani polecił/a?\", \"pronunciation\": \"/wʌt wʊd juː ˌrɛkəˈmɛnd/\" },\n      { \"phrase\": \"The bill, please.\", \"translation\": \"Rachunek, proszę.\", \"pronunciation\": \"/ðə bɪl pliːz/\" },\n      { \"phrase\": \"Thank you, it was delicious.\", \"translation\": \"Dziękuję, było przepyszne.\", \"pronunciation\": \"/θæŋk juː ɪt wʌz dɪˈlɪʃəs/\" }\n    ],\n    \"dialogues\": [\n      {\n        \"scene\": \"Ordering food at a restaurant\",\n        \"dialogue\": \"A: Good evening, I'd like a table for two, please. \\nB: Certainly, follow me. \\nA: Can I see the menu, please? \\nB: Of course. What would you like to order? \\nA: I think I'll have the steak. \\nB: And for you? \\nC: I'll have the pasta.\"\n      }\n    ],\n    \"grammar\": {\n      \"topic\": \"Present Continuous\",\n      \"explanation\": \"The present continuous tense is used for actions that are happening now. It is formed by using the verb 'to be' (am, is, are) + the present participle (-ing). For example: 'I am eating lunch.' 'They are playing soccer.'\"\n    },\n    \"places\": {\n      \"title\": \"Visiting a Pub\",\n      \"phrases\": [\n        { \"phrase\": \"Can I have a pint of beer, please?\", \"translation\": \"Czy mogę dostać kufel piwa, proszę?\", \"pronunciation\": \"/kæn aɪ hæv ə paɪnt ʌv bɪr pliːz/\" },\n        { \"phrase\": \"What kind of ale do you have?\", \"translation\": \"Jakie piwo mają Państwo?\", \"pronunciation\": \"/wʌt kaɪnd ʌv eɪl duː juː hæv/\" },\n        { \"phrase\": \"Can I get another round?\", \"translation\": \"Czy mogę zamówić jeszcze rundkę?\", \"pronunciation\": \"/kæn aɪ ɡɛt əˈnʌðər raʊnd/\" }\n      ]\n    },\n    \"tasks\": [\n      { \"task\": \"Write a short dialogue about ordering food at a cafe.\" },\n      { \"task\": \"Role-play a conversation at a restaurant, ordering a meal and paying the bill.\" }\n    ],\n    \"culture\": {\n      \"title\": \"British Pub Culture\",\n      \"content\": \"Pubs are a very important part of British culture. They are places where people go to socialize, drink, and eat.\"\n    }\n  },\n  {\n    \"day\": 6,\n    \"title\": \"Asking for Directions\",\n    \"phrases\": [\n      { \"phrase\": \"Excuse me, where is the...?\", \"translation\": \"Przepraszam, gdzie jest...?\", \"pronunciation\": \"/ɪkˈskjuːz miː wɛr ɪz ðə...\" },\n      { \"phrase\": \"Can you tell me how to get to...?\", \"translation\": \"Czy może Pan/Pani mi powiedzieć, jak dojść do...?\", \"pronunciation\": \"/kæn juː tɛl miː haʊ tuː ɡɛt tuː...\" },\n      { \"phrase\": \"Is it far from here?\", \"translation\": \"Czy to daleko stąd?\", \"pronunciation\": \"/ɪz ɪt fɑːr frʌm hɪr/\" },\n      { \"phrase\": \"Go straight ahead.\", \"translation\": \"Idź prosto.\", \"pronunciation\": \"/ɡoʊ streɪt əˈhɛd/\" },\n      { \"phrase\": \"Turn left/right at the next corner.\", \"translation\": \"Skręć w lewo/prawo na następnym rogu.\", \"pronunciation\": \"/tɜːrn lɛft/raɪt æt ðə nɛkst ˈkɔːrnər/\" },\n      { \"phrase\": \"Thank you for your help.\", \"translation\": \"Dziękuję za pomoc.\", \"pronunciation\": \"/θæŋk juː fɔːr jɔːr hɛlp/\" }\n    ],\n    \"dialogues\": [\n      {\n        \"scene\": \"Asking for directions in the street\",\n        \"dialogue\": \"A: Excuse me, where is the train station? \\nB: It's about two blocks from here. Go straight ahead and turn right at the next corner. You'll see it on your left. \\nA: Thank you so much!\"\n      }\n    ],\n    \"grammar\": {\n      \"topic\": \"Prepositions of Place\",\n      \"explanation\": \"Prepositions of place are used to show the position of something. Examples include: 'in', 'on', 'under', 'behind', 'in front of', 'next to'.\"\n    },\n    \"places\": {\n      \"title\": \"Visiting a Park\",\n      \"phrases\": [\n        { \"phrase\": \"Is there a playground here?\", \"translation\": \"Czy jest tu plac zabaw?\", \"pronunciation\": \"/ɪz ðɛr ə ˈpleɪɡraʊnd hɪr/\" },\n        { \"phrase\": \"Where are the restrooms?\", \"translation\": \"Gdzie są toalety?\", \"pronunciation\": \"/wɛr ɑːr ðə ˈrɛstruːmz/\" },\n        { \"phrase\": \"Can I have a picnic here?\", \"translation\": \"Czy mogę tu zrobić piknik?\", \"pronunciation\": \"/kæn aɪ hæv ə ˈpɪknɪk hɪr/\" }\n      ]\n    },\n    \"tasks\": [\n      { \"task\": \"Write a short dialogue about asking for directions to a library.\" },\n      { \"task\": \"Role-play a conversation with a friend, giving them directions to your house.\" }\n    ],\n    \"culture\": {\n      \"title\": \"British Humor\",\n      \"content\": \"British humor is known for its wit and irony. It often uses sarcasm and understatement.\"\n    }\n  },\n  {\n    \"day\": 7,\n    \"title\": \"Saying Goodbye\",\n    \"phrases\": [\n      { \"phrase\": \"Goodbye.\", \"translation\": \"Do widzenia.\", \"pronunciation\": \"/ɡʊdˈbaɪ/\" },\n      { \"phrase\": \"See you later.\", \"translation\": \"Do zobaczenia.\", \"pronunciation\": \"/siː juː ˈleɪtər/\" },\n      { \"phrase\": \"Take care.\", \"translation\": \"Uważaj na siebie.\", \"pronunciation\": \"/teɪk kɛr/\" },\n      { \"phrase\": \"Have a good day.\", \"translation\": \"Miłego dnia.\", \"pronunciation\": \"/hæv ə ɡʊd deɪ/\" },\n      { \"phrase\": \"Have a nice evening.\", \"translation\": \"Miłego wieczoru.\", \"pronunciation\": \"/hæv ə naɪs ˈiːvnɪŋ/\" },\n      { \"phrase\": \"It was nice meeting you.\", \"translation\": \"Miło było Cię poznać.\", \"pronunciation\": \"/ɪt wʌz naɪs ˈmiːtɪŋ juː/\" },\n      { \"phrase\": \"I'll talk to you soon.\", \"translation\": \"Zostanę w kontakcie.\", \"pronunciation\": \"/aɪl tɔːk tuː juː suːn/\" }\n    ],\n    \"dialogues\": [\n      {\n        \"scene\": \"Saying goodbye to a friend\",\n        \"dialogue\": \"A: I'm going to leave now. \\nB: Okay, see you later! \\nA: It was nice talking to you. \\nB: You too. Take care.\"\n      }\n    ],\n    \"grammar\": {\n      \"topic\": \"Simple Past Tense\",\n      \"explanation\": \"The simple past tense is used to talk about actions that happened in the past. It is formed by adding -ed to the end of regular verbs. For example: 'walk' becomes 'walked', 'play' becomes 'played'. Some verbs have irregular past tense forms.\"\n    },\n    \"places\": {\n      \"title\": \"Visiting a Theater\",\n      \"phrases\": [\n        { \"phrase\": \"Where are the seats?\", \"translation\": \"Gdzie są miejsca?\", \"pronunciation\": \"/wɛr ɑːr ðə siːts/\" },\n        { \"phrase\": \"Is the show starting soon?\", \"translation\": \"Czy przedstawienie zaraz się zaczyna?\", \"pronunciation\": \"/ɪz ðə ʃoʊ ˈstɑːrtɪŋ suːn/\" },\n        { \"phrase\": \"Can I buy a program?\", \"translation\": \"Czy mogę kupić program?\", \"pronunciation\": \"/kæn aɪ baɪ ə ˈproʊɡræm/\" }\n      ]\n    },\n    \"tasks\": [\n      { \"task\": \"Write a short conversation between two people saying goodbye to each other.\" },\n      { \"task\": \"Practice saying goodbye to different people in different situations.\" }\n    ],\n    \"culture\": {\n      \"title\": \"American Culture\",\n      \"content\": \"American culture is diverse and includes many different influences. It is known for its focus on individualism, freedom, and innovation.\"\n    }\n  }\n]\n```" },
            ],
        },
    ],
});



export const AI_PROMPT = `Stwórz szczegółowy kurs nauki języka {lang} dla poziomu {level} na {days} dni. Każdy dzień kursu powinien zawierać:
    1. Praktyczne zwroty wraz z tłumaczeniami i wymową.
    2. Krótkie dialogi, które można wykorzystać w codziennych sytuacjach (np. w sklepie, restauracji, na lotnisku).
    3. Wyjaśnienie podstawowych zasad gramatycznych.
    4. Listę miejsc, które warto odwiedzić, znając ten język, oraz jak się tam komunikować.
    5. Zadania praktyczne, które pomogą uczestnikowi kursu ćwiczyć nowo nabyte umiejętności.
    6. Ciekawostki kulturowe związane z językiem.
    Proszę o wygenerowanie kursu w formacie JSON, gdzie każdy dzień jest osobnym obiektem.`

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
    authDomain: "fluentai-79215.firebaseapp.com",
    projectId: "fluentai-79215",
    storageBucket: "fluentai-79215.appspot.com",
    messagingSenderId: "819379255081",
    appId: "1:819379255081:web:afba7552d07ce923b5e938",
    measurementId: "G-ENJ12PN7NS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)


export const plan = {
    link:
        process.env.NODE_ENV === 'development'
            ? 'https://buy.stripe.com/test_8wM3fCf1m96VeYM144'
            : '',
    priceId:
        process.env.NODE_ENV === 'development'
            ? 'price_1QAZt7EEFVvxreVk2CzZSmUB'
            : ''
}

export default {
    GetUserInfo,
    CreateNewUser,
    GetUserCourses,
    GetSubscriptionInfo,
    AI_PROMPT,
    saveCourseInStripe,
    ChangeSubscription
}