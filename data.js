// Travel Phrase Guide data — San Sebastián (Spanish) & Portugal (Portuguese)
// Transcribed from Spain_Portugal_Phrase_Guide.md

const PHRASE_DATA = {
  es: {
    label: "Spanish",
    sublabel: "San Sebastián",
    flag: "🇪🇸",
    locale: "es-ES",
    sections: [
      {
        name: "Basics",
        cards: [
          { phrase: "Por favor", pron: "poor fah-VOR", meaning: "Please" },
          { phrase: "Sí", pron: "see", meaning: "Yes" },
          { phrase: "No", pron: "no", meaning: "No" },
          { phrase: "Perdón / Disculpe", pron: "pehr-DOHN / dees-KOOL-peh", meaning: "Sorry / Excuse me" },
          { phrase: "No entiendo", pron: "no en-tee-EN-doh", meaning: "I don't understand" },
          { phrase: "No hablo más español", pron: "no AH-bloh mahs es-pah-NYOL", meaning: "I don't know any more Spanish" },
          { phrase: "Solo sé un poco de español", pron: "SOH-loh seh oon POH-koh deh es-pah-NYOL", meaning: "I only know a little Spanish" },
          { phrase: "Más despacio, por favor", pron: "mahs des-PAH-see-oh poor fah-VOR", meaning: "More slowly, please" },
          { phrase: "¿Habla inglés?", pron: "AH-blah een-GLESS", meaning: "Do you speak English?" },
          { phrase: "Esto", pron: "EH-stoh", meaning: "This (pointing)" },
          { phrase: "Gracias", pron: "GRAH-see-ahs", meaning: "Thank you" },
          { phrase: "¿Vale?", pron: "VAH-leh", meaning: "Okay?" },
          { phrase: "Un momento, por favor", pron: "oon moh-MEN-toh poor fah-VOR", meaning: "One moment, please" },
          { phrase: "Encantada / Encantado", pron: "en-kahn-TAH-dah / doh", meaning: "Nice to meet you (you say encantada, your partner says encantado)" },
          { phrase: "¿Dónde está el baño?", pron: "DOHN-deh es-TAH el BAH-nyoh", meaning: "Where's the toilet/washroom?" },
          { phrase: "Buenos días", pron: "BWEH-nohs DEE-ahs", meaning: "Good morning" },
          { phrase: "Buenas tardes", pron: "BWEH-nahs TAR-dess", meaning: "Good afternoon" },
          { phrase: "Buenas noches", pron: "BWEH-nahs NOH-chess", meaning: "Good evening" },
          { phrase: "No, gracias", pron: "no GRAH-see-ahs", meaning: "No, thank you" },
          { phrase: "Bueno/a", pron: "BWEH-noh/nah", meaning: "Good" },
          { phrase: "Me gusta", pron: "meh GOOS-tah", meaning: "I like this" },
          { phrase: "Me encanta", pron: "meh en-KAHN-tah", meaning: "I love this" },
          { phrase: "Delicioso", pron: "deh-lee-see-OH-soh", meaning: "Delicious" },
          { phrase: "Qué mono / mona", pron: "keh MOH-noh / MOH-nah", meaning: "So cute" },
          { phrase: "Qué guapa / guapo", pron: "keh GWAH-pah / poh", meaning: "So pretty" },
          { phrase: "¿Puede ayudarme?", pron: "PWEH-deh ah-yoo-DAR-meh", meaning: "Can you help me?" },
          { phrase: "Uno más, por favor", pron: "OO-noh mahs poor fah-VOR", meaning: "One more, please" },
          { phrase: "Ya terminamos", pron: "yah ter-mee-NAH-mohs", meaning: "We're finished (with the meal)" },
          { phrase: "Reserva", pron: "reh-SEHR-vah", meaning: "Reservation" },
          { phrase: "¿Tiene reserva?", pron: "tee-EH-neh reh-SEHR-vah", meaning: "Do you have a reservation? (what they'll ask you)" },
          { phrase: "Eh... / Esto...", pron: "eh / EH-stoh", meaning: "Um... (thinking filler)" },
          { phrase: "Uno / Dos", pron: "OO-noh / dohs", meaning: "1 item / 2 items" },
          { phrase: "Una persona / Dos personas", pron: "OO-nah per-SOH-nah / dohs per-SOH-nahs", meaning: "1 person / 2 people" }
        ]
      },
      {
        name: "Coffee",
        cards: [
          { phrase: "Un café con leche", pron: "oon kah-FEH kohn LEH-cheh", meaning: "Coffee with milk (closest to a latte)" },
          { phrase: "Un cortado", pron: "oon kor-TAH-doh", meaning: "Espresso with a small splash of milk" },
          { phrase: "Leche sin lactosa", pron: "LEH-cheh seen lahk-TOH-sah", meaning: "Lactose-free milk" },
          { phrase: "¿Tiene leche sin lactosa?", pron: "tee-EH-neh LEH-cheh seen lahk-TOH-sah", meaning: "Do you have lactose-free milk?" }
        ],
        note: "Ordering \"un café\" alone defaults to a small black espresso. There's no native \"flat white\" — at a specialty coffee shop you can usually just say \"flat white\" in English, or order a cortado in a traditional café for something similar in ratio."
      },
      {
        name: "Getting Around",
        cards: [
          { phrase: "Izquierda", pron: "eeth-kee-EHR-dah", meaning: "Left" },
          { phrase: "Derecha", pron: "deh-REH-chah", meaning: "Right" },
          { phrase: "Todo recto", pron: "TOH-doh REHK-toh", meaning: "Straight ahead" },
          { phrase: "Aquí / Allí", pron: "ah-KEE / ah-YEE", meaning: "Here / There" },
          { phrase: "Cerca / Lejos", pron: "SEHR-kah / LEH-hohs", meaning: "Near / Far" },
          { phrase: "¿Dónde está...?", pron: "DOHN-deh es-TAH", meaning: "Where is...?" },
          { phrase: "¿Cómo llego a...?", pron: "KOH-moh YEH-goh ah", meaning: "How do I get to...?" },
          { phrase: "La parada (de autobús)", pron: "lah pah-RAH-dah (deh ow-toh-BOOS)", meaning: "The (bus) stop" },
          { phrase: "La estación", pron: "lah es-tah-see-OHN", meaning: "The station" },
          { phrase: "Un taxi", pron: "oon TAHK-see", meaning: "A taxi" },
          { phrase: "Con permiso", pron: "kohn per-MEE-soh", meaning: "Excuse me (to pass by)" },
          { phrase: "No pasa nada", pron: "no PAH-sah NAH-dah", meaning: "No worries / it's fine" },
          { phrase: "De nada", pron: "deh NAH-dah", meaning: "You're welcome" }
        ],
        note: "\"Con permiso\" is your best friend in crowded pintxos bars — say it while gently moving through, more natural than \"perdón\" for that specific situation."
      },
      {
        name: "Ordering & Restaurant",
        cards: [
          { phrase: "Quisiera pedir", pron: "kee-see-EH-rah peh-DEER", meaning: "I'd like to order" },
          { phrase: "¿Qué lleva esto?", pron: "keh YEH-vah EH-stoh", meaning: "What's in this?" },
          { phrase: "No muy picante", pron: "no mwee pee-KAHN-teh", meaning: "Not too spicy" },
          { phrase: "Para compartir", pron: "PAH-rah kohm-par-TEER", meaning: "To share" },
          { phrase: "¿Cuál es la especialidad?", pron: "kwahl es lah es-peh-see-ah-lee-DAHD", meaning: "What's the specialty?" },
          { phrase: "Una copa de vino tinto/blanco", pron: "OO-nah KOH-pah deh VEE-noh TEEN-toh/BLAHN-koh", meaning: "A glass of red/white wine" },
          { phrase: "Vino de la casa", pron: "VEE-noh deh lah KAH-sah", meaning: "House wine" },
          { phrase: "Una caña", pron: "OO-nah KAH-nyah", meaning: "A (draft) beer" },
          { phrase: "¿A qué hora cierran?", pron: "ah keh OH-rah see-EH-rahn", meaning: "What time do you close?" },
          { phrase: "¿Está abierto?", pron: "es-TAH ah-bee-EHR-toh", meaning: "Is it open?" },
          { phrase: "Todo estaba delicioso, gracias", pron: "TOH-doh es-TAH-bah deh-lee-see-OH-soh GRAH-see-ahs", meaning: "Thanks for the meal (on departure)" }
        ]
      },
      {
        name: "Money & Shopping",
        cards: [
          { phrase: "La cuenta, por favor", pron: "lah KWEN-tah poor fah-VOR", meaning: "Check, please" },
          { phrase: "¿Tarjeta?", pron: "tar-HEH-tah", meaning: "Card? (simplified — just hold it up)" },
          { phrase: "¿Cuánto cuesta?", pron: "KWAHN-toh KWES-tah", meaning: "How much is this?" },
          { phrase: "¿Tiene uno más grande/pequeño?", pron: "tee-EH-neh OO-noh mahs GRAHN-deh/peh-KEH-nyoh", meaning: "Do you have a bigger/smaller one?" }
        ],
        note: "Tipping isn't expected in Spain — rounding up is generous, never required. The pen-signing hand gesture for \"check, please\" is understood here too."
      },
      {
        name: "Social & Practical",
        cards: [
          { phrase: "Felicidades", pron: "feh-lee-see-DAH-dess", meaning: "Congratulations" },
          { phrase: "Que tengas un buen día/noche", pron: "keh TEN-gahs oon bwen DEE-ah/NOH-cheh", meaning: "Have a good day/night" },
          { phrase: "¿Dónde está la farmacia?", pron: "DOHN-deh es-TAH lah far-MAH-see-ah", meaning: "Where's the pharmacy?" },
          { phrase: "Necesito ayuda", pron: "neh-seh-SEE-toh ah-YOO-dah", meaning: "I need help" },
          { phrase: "Llame a un médico", pron: "YAH-meh ah oon MEH-dee-koh", meaning: "Call a doctor" }
        ]
      }
    ],
    numbers: {
      note: "For 21+, use \"y\" (\"and\") between tens and units — 31 = treinta y uno, 45 = cuarenta y cinco. \"Cien\" becomes \"ciento\" once followed by more digits: 154 = ciento cincuenta y cuatro. 500 is irregular (quinientos, not \"cinco cientos\"). Prices use a comma for decimals — 12,50 € is read \"doce con cincuenta.\"",
      items: [
        { num: "1", word: "uno" },
        { num: "2", word: "dos" },
        { num: "3", word: "tres" },
        { num: "4", word: "cuatro" },
        { num: "5", word: "cinco" },
        { num: "6", word: "seis" },
        { num: "7", word: "siete" },
        { num: "8", word: "ocho" },
        { num: "9", word: "nueve" },
        { num: "10", word: "diez" },
        { num: "20", word: "veinte" },
        { num: "30", word: "treinta" },
        { num: "40", word: "cuarenta" },
        { num: "50", word: "cincuenta" },
        { num: "60", word: "sesenta" },
        { num: "70", word: "setenta" },
        { num: "80", word: "ochenta" },
        { num: "90", word: "noventa" },
        { num: "100", word: "cien" },
        { num: "500", word: "quinientos" },
        { num: "1,000", word: "mil" }
      ]
    }
  },

  pt: {
    label: "Portuguese",
    sublabel: "Portugal",
    flag: "🇵🇹",
    locale: "pt-PT",
    sections: [
      {
        name: "Basics",
        cards: [
          { phrase: "Por favor / Se faz favor", pron: "poor fah-VOR", meaning: "Please" },
          { phrase: "Sim", pron: "seeng", meaning: "Yes" },
          { phrase: "Não", pron: "nowng (nasal)", meaning: "No" },
          { phrase: "Desculpe", pron: "dish-KOOL-peh", meaning: "Sorry / Excuse me" },
          { phrase: "Não entendo / Não percebo", pron: "nowng en-TEN-doo", meaning: "I don't understand" },
          { phrase: "Não sei mais português", pron: "nowng say mighsh por-too-GESH", meaning: "I don't know any more Portuguese" },
          { phrase: "Só sei um pouco de português", pron: "soh say oong POH-koo deh por-too-GESH", meaning: "I only know a little Portuguese" },
          { phrase: "Mais devagar, por favor", pron: "mighsh deh-vah-GAHR poor fah-VOR", meaning: "More slowly, please" },
          { phrase: "Fala inglês?", pron: "FAH-lah een-GLESH", meaning: "Do you speak English?" },
          { phrase: "Isto", pron: "EESH-too", meaning: "This (pointing)" },
          { phrase: "Obrigada / Obrigado", pron: "oh-bree-GAH-dah / doo", meaning: "Thank you (you say obrigada, your partner says obrigado — based on speaker's own gender, said constantly)" },
          { phrase: "Pode ser? / Está bem?", pron: "POH-deh sehr / esh-TAH bang", meaning: "Okay?" },
          { phrase: "Um momento, por favor", pron: "oong moh-MEN-too poor fah-VOR", meaning: "One moment, please" },
          { phrase: "Prazer", pron: "prah-ZEHR", meaning: "Nice to meet you (not gendered)" },
          { phrase: "Onde é a casa de banho?", pron: "OHN-deh eh ah KAH-zah deh BAH-nyoo", meaning: "Where's the toilet/washroom?" },
          { phrase: "Bom dia", pron: "bohng DEE-ah", meaning: "Good morning" },
          { phrase: "Boa tarde", pron: "BOH-ah TAR-deh", meaning: "Good afternoon" },
          { phrase: "Boa noite", pron: "BOH-ah NOY-teh", meaning: "Good evening" },
          { phrase: "Não, obrigada/o", pron: "nowng oh-bree-GAH-dah/doo", meaning: "No, thank you" },
          { phrase: "Bom/Boa", pron: "bohng / BOH-ah", meaning: "Good" },
          { phrase: "Gosto disto", pron: "GOSH-too DEESH-too", meaning: "I like this" },
          { phrase: "Adoro isto", pron: "ah-DOH-roo EESH-too", meaning: "I love this" },
          { phrase: "Delicioso/a", pron: "deh-lee-see-OH-zoo/zah", meaning: "Delicious" },
          { phrase: "Que fofo/a", pron: "keh FOH-foo/fah", meaning: "So cute" },
          { phrase: "Que linda / lindo", pron: "keh LEEN-dah / doo", meaning: "So pretty" },
          { phrase: "Pode ajudar-me?", pron: "POH-deh ah-zhoo-DAR-meh", meaning: "Can you help me?" },
          { phrase: "Mais um, por favor", pron: "mighsh oong poor fah-VOR", meaning: "One more, please" },
          { phrase: "Já terminámos", pron: "zhah ter-mee-NAH-moosh", meaning: "We're finished (with the meal)" },
          { phrase: "Reserva", pron: "reh-ZEHR-vah", meaning: "Reservation" },
          { phrase: "Tem reserva?", pron: "tang reh-ZEHR-vah", meaning: "Do you have a reservation? (what they'll ask you)" },
          { phrase: "É... / Hã...", pron: "eh / hang", meaning: "Um... (thinking filler)" },
          { phrase: "Um / Dois", pron: "oong / doysh", meaning: "1 item / 2 items" },
          { phrase: "Uma pessoa / Duas pessoas", pron: "OO-mah peh-SOH-ah / DOO-ahsh peh-SOH-ahsh", meaning: "1 person / 2 people" }
        ]
      },
      {
        name: "Coffee",
        cards: [
          { phrase: "Um galão", pron: "oong gah-LOWNG", meaning: "Milky coffee in a glass (closest to a latte)" },
          { phrase: "Uma meia de leite", pron: "OO-mah MAY-ah deh LAY-teh", meaning: "Coffee with milk, smaller than a galão" },
          { phrase: "Leite sem lactose", pron: "LAY-teh sang lahk-TOHZ", meaning: "Lactose-free milk" },
          { phrase: "Tem leite sem lactose?", pron: "tang LAY-teh sang lahk-TOHZ", meaning: "Do you have lactose-free milk?" }
        ],
        note: "\"Um café\" alone defaults to a small espresso (called a bica in Lisbon). No native \"flat white\" — try a specialty coffee shop and ask by name, or order a meia de leite for something in that texture range."
      },
      {
        name: "Getting Around",
        cards: [
          { phrase: "Esquerda", pron: "ish-KEHR-dah", meaning: "Left" },
          { phrase: "Direita", pron: "dee-RAY-tah", meaning: "Right" },
          { phrase: "Sempre em frente", pron: "SEM-preh eng FREN-teh", meaning: "Straight ahead" },
          { phrase: "Aqui / Ali", pron: "ah-KEE / ah-LEE", meaning: "Here / There" },
          { phrase: "Perto / Longe", pron: "PEHR-too / LOHN-zheh", meaning: "Near / Far" },
          { phrase: "Onde é...?", pron: "OHN-deh eh", meaning: "Where is...?" },
          { phrase: "Como chego a...?", pron: "KOH-moo SHEH-goo ah", meaning: "How do I get to...?" },
          { phrase: "A paragem (de autocarro)", pron: "ah pah-RAH-zheng (deh ow-too-KAH-roo)", meaning: "The (bus) stop" },
          { phrase: "A estação", pron: "ah esh-tah-SOWNG", meaning: "The station" },
          { phrase: "Um táxi", pron: "oong TAHK-see", meaning: "A taxi" },
          { phrase: "Com licença", pron: "kong lee-SEN-sah", meaning: "Excuse me (to pass by)" },
          { phrase: "De nada", pron: "deh NAH-dah", meaning: "You're welcome" }
        ],
        note: "People often respond to \"obrigada\" with \"de nada\" or just a nod — no need to over-thank."
      },
      {
        name: "Ordering & Restaurant",
        cards: [
          { phrase: "Queria pedir", pron: "keh-REE-ah peh-DEER", meaning: "I'd like to order" },
          { phrase: "O que tem isto?", pron: "oo keh tang EESH-too", meaning: "What's in this?" },
          { phrase: "Não muito picante", pron: "nowng MWEE-too pee-KAHN-teh", meaning: "Not too spicy" },
          { phrase: "Para partilhar", pron: "PAH-rah par-tee-LYAR", meaning: "To share" },
          { phrase: "Qual é a especialidade?", pron: "kwahl eh ah esh-peh-see-ah-lee-DAH-deh", meaning: "What's the specialty?" },
          { phrase: "Um copo de vinho tinto/branco", pron: "oong KOH-poo deh VEE-nyoo TEEN-too/BRAHN-koo", meaning: "A glass of red/white wine" },
          { phrase: "Vinho da casa", pron: "VEE-nyoo dah KAH-zah", meaning: "House wine" },
          { phrase: "Uma imperial (Lisbon) / um fino (Porto)", pron: "OO-mah eem-peh-ree-AHL / oong FEE-noo", meaning: "A (draft) beer — note the regional difference" },
          { phrase: "A que horas fecham?", pron: "ah keh OH-rahsh FEH-showng", meaning: "What time do you close?" },
          { phrase: "Está aberto?", pron: "esh-TAH ah-BEHR-too", meaning: "Is it open?" },
          { phrase: "Estava tudo delicioso, obrigada/o", pron: "esh-TAH-vah TOO-doo deh-lee-see-OH-zoo oh-bree-GAH-dah/doo", meaning: "Thanks for the meal (on departure)" }
        ]
      },
      {
        name: "Money & Shopping",
        cards: [
          { phrase: "A conta, por favor", pron: "ah KOHN-tah poor fah-VOR", meaning: "Check, please" },
          { phrase: "Cartão?", pron: "kar-TOWNG", meaning: "Card? (simplified — just hold it up)" },
          { phrase: "Quanto custa?", pron: "KWAHN-too KOOSH-tah", meaning: "How much is this?" },
          { phrase: "Tem um maior/mais pequeno?", pron: "tang oong my-OR / mighsh peh-KEH-noo", meaning: "Do you have a bigger/smaller one?" }
        ],
        note: "Tipping isn't obligatory — a euro or two rounding up on a restaurant bill is appreciated. The pen-signing hand gesture for \"check, please\" is understood here too."
      },
      {
        name: "Social & Practical",
        cards: [
          { phrase: "Parabéns", pron: "pah-rah-BENGSH", meaning: "Congratulations" },
          { phrase: "Tenha um bom dia/boa noite", pron: "TEN-yah oong bohng DEE-ah/BOH-ah NOY-teh", meaning: "Have a good day/night" },
          { phrase: "Até logo / Tchau", pron: "ah-TEH LOH-goo / chow", meaning: "See you later / Bye (casual — \"tchau\" is very common)" },
          { phrase: "Onde é a farmácia?", pron: "OHN-deh eh ah far-MAH-see-ah", meaning: "Where's the pharmacy?" },
          { phrase: "Preciso de ajuda", pron: "preh-SEE-zoo deh ah-ZHOO-dah", meaning: "I need help" },
          { phrase: "Chame um médico", pron: "SHAH-meh oong MEH-dee-koo", meaning: "Call a doctor" }
        ]
      }
    ],
    numbers: {
      note: "Use \"e\" (\"and\") between tens and units — 154 = cento e cinquenta e quatro. 500 is irregular (quinhentos). Prices also use a comma for decimals — 12,50 € is read \"doze e cinquenta.\"",
      items: [
        { num: "1", word: "um" },
        { num: "2", word: "dois" },
        { num: "3", word: "três" },
        { num: "4", word: "quatro" },
        { num: "5", word: "cinco" },
        { num: "6", word: "seis" },
        { num: "7", word: "sete" },
        { num: "8", word: "oito" },
        { num: "9", word: "nove" },
        { num: "10", word: "dez" },
        { num: "20", word: "vinte" },
        { num: "30", word: "trinta" },
        { num: "50", word: "cinquenta" },
        { num: "100", word: "cem" },
        { num: "500", word: "quinhentos" },
        { num: "1,000", word: "mil" }
      ]
    }
  }
};
