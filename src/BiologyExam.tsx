import React, { useState, useEffect } from "react";

const BiologyExam = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60 * 100); // 100 minutos
  const [examMode, setExamMode] = useState("full"); // 'full', 'practice', 'review'
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTopic, setFilterTopic] = useState("all");

  // Ejemplo con solo 3 preguntas - puedes expandirlo a 100
  const questions = [
    {
      id: 1,
      text: "¿Cuáles son los bioelementos que constituyen principalmente a los carbohidratos?",
      options: [
        { label: "A", text: "C, H, O" },
        { label: "B", text: "C, H, P" },
        { label: "C", text: "C, H, Mg" },
        { label: "D", text: "C, H, O, N" },
      ],
      correctAnswer: "A",
      topic: "molecular",
    },
    {
      id: 2,
      text: "La sacarosa resulta de la unión de los monosacáridos:",
      options: [
        { label: "A", text: "Glucosa + glucosa" },
        { label: "B", text: "Glucosa + galactosa" },
        { label: "C", text: "Glucosa + fructosa" },
        { label: "D", text: "Glucosa + ribosa" },
      ],
      correctAnswer: "C",
      topic: "molecular",
    },
    {
      id: 3,
      text: "¿Cuál de los siguientes ejemplos es una proteína de reserva de energía?",
      options: [
        { label: "A", text: "Queratina" },
        { label: "B", text: "Colágeno" },
        { label: "C", text: "Albúmina y caseína" },
        { label: "D", text: "Hemoglobina" },
      ],
      correctAnswer: "C",
      topic: "molecular",
    },
    {
      id: 4,
      text: "¿Qué tipo de enlace se encuentra en las proteínas?",
      options: [
        { label: "A", text: "Glucosídico" },
        { label: "B", text: "Peptídico" },
        { label: "C", text: "Fosfodiéster" },
        { label: "D", text: "Iónico" },
      ],
      correctAnswer: "B",
      topic: "molecular",
    },
    {
      id: 5,
      text: "¿Cuáles son los elementos que constituyen a los carbohidratos?",
      options: [
        { label: "A", text: "CHON" },
        { label: "B", text: "CHOP" },
        { label: "C", text: "CHO" },
        { label: "D", text: "CHNOS" },
      ],
      correctAnswer: "C",
      topic: "molecular",
    },
    {
      id: 6,
      text: "¿Cuál es el azúcar del ADN?",
      options: [
        { label: "A", text: "Ribosa" },
        { label: "B", text: "Desoxirribosa" },
        { label: "C", text: "Fructosa" },
        { label: "D", text: "Glucosa" },
      ],
      correctAnswer: "B",
      topic: "molecular",
    },
    {
      id: 7,
      text: "¿Cómo se llama la molécula que contiene la información genética?",
      options: [
        { label: "A", text: "Proteína" },
        { label: "B", text: "ARN" },
        { label: "C", text: "ADN" },
        { label: "D", text: "Lípido" },
      ],
      correctAnswer: "C",
      topic: "molecular",
    },
    {
      id: 8,
      text: "¿Cuál es la función principal de los lípidos?",
      options: [
        { label: "A", text: "Reserva de energía a corto plazo" },
        { label: "B", text: "Formar la estructura de las proteínas" },
        {
          label: "C",
          text: "Reserva de energía y formar las membranas celulares",
        },
        { label: "D", text: "Transportar oxígeno" },
      ],
      correctAnswer: "C",
      topic: "molecular",
    },
    {
      id: 9,
      text: "¿Cuál es la molécula que lleva la información en los cromosomas?",
      options: [
        { label: "A", text: "Proteína" },
        { label: "B", text: "ARN" },
        { label: "C", text: "ADN" },
        { label: "D", text: "Lípido" },
      ],
      correctAnswer: "C",
      topic: "molecular",
    },
    {
      id: 10,
      text: "¿Cuál es la función principal de las proteínas?",
      options: [
        { label: "A", text: "Almacenar información genética" },
        {
          label: "B",
          text: "Catalizar reacciones metabólicas y formar estructuras",
        },
        { label: "C", text: "Almacenar energía a largo plazo" },
        { label: "D", text: "Formar las membranas celulares" },
      ],
      correctAnswer: "B",
      topic: "molecular",
    },
    {
      id: 11,
      text: "¿Cuáles son las bases púricas del ADN?",
      options: [
        { label: "A", text: "Citosina y timina" },
        { label: "B", text: "Adenina y guanina" },
        { label: "C", text: "Timina y uracilo" },
        { label: "D", text: "Citosina y uracilo" },
      ],
      correctAnswer: "B",
      topic: "molecular",
    },
    {
      id: 12,
      text: "¿Cuáles son las bases pirimídicas del ARN?",
      options: [
        { label: "A", text: "Adenina y guanina" },
        { label: "B", text: "Citosina y guanina" },
        { label: "C", text: "Citosina y uracilo" },
        { label: "D", text: "Timina, citosina y uracilo" },
      ],
      correctAnswer: "C",
      topic: "molecular",
    },
    {
      id: 13,
      text: "¿Cuál es la molécula fuente de energía por excelencia en los seres vivos?",
      options: [
        { label: "A", text: "Almidón" },
        { label: "B", text: "Glucógeno" },
        { label: "C", text: "Glucosa" },
        { label: "D", text: "Sacarosa" },
      ],
      correctAnswer: "C",
      topic: "cellular",
    },
    {
      id: 14,
      text: "¿Cuál es el organelo esencial para la respiración aerobia en eucariontes?",
      options: [
        { label: "A", text: "Cloroplasto" },
        { label: "B", text: "Núcleo" },
        { label: "C", text: "Mitocondria" },
        { label: "D", text: "Ribosoma" },
      ],
      correctAnswer: "C",
      topic: "cellular",
    },
    {
      id: 15,
      text: "¿Cuál es el organelo donde se realiza la fotosíntesis en células vegetales?",
      options: [
        { label: "A", text: "Mitocondria" },
        { label: "B", text: "Ribosoma" },
        { label: "C", text: "Cloroplasto" },
        { label: "D", text: "Retículo endoplasmático" },
      ],
      correctAnswer: "C",
      topic: "cellular",
    },
    {
      id: 16,
      text: "¿Qué se obtiene cuando se hidroliza el ATP?",
      options: [
        { label: "A", text: "ADP" },
        { label: "B", text: "ARN" },
        { label: "C", text: "ADN" },
        { label: "D", text: "AMP" },
      ],
      correctAnswer: "A",
      topic: "cellular",
    },
    {
      id: 17,
      text: "En la fotosíntesis, ¿de dónde se rompe una molécula de H₂O para producir inicialmente?",
      options: [
        { label: "A", text: "Glucosa" },
        { label: "B", text: "Moléxido de carbono" }, // Asumo que es Dióxido de Carbono
        { label: "C", text: "Oxígeno" },
        { label: "D", text: "Dióxido de carbono" },
      ],
      correctAnswer: "C",
      topic: "cellular",
    },
    {
      id: 18,
      text: "¿Dónde se localizan principalmente los pigmentos para la fotosíntesis en las células vegetales?",
      options: [
        { label: "A", text: "Estroma" },
        { label: "B", text: "Tilacoide" },
        { label: "C", text: "Citoplasma" },
        { label: "D", text: "Mitocondria" },
      ],
      correctAnswer: "B",
      topic: "cellular",
    },
    {
      id: 19,
      text: "¿Cuál es la función principal de los ribosomas?",
      options: [
        { label: "A", text: "Producción de energía" },
        { label: "B", text: "Síntesis de proteínas" },
        { label: "C", text: "Almacenamiento de agua" },
        { label: "D", text: "Digestión celular" },
      ],
      correctAnswer: "B",
      topic: "cellular",
    },
    {
      id: 20,
      text: "¿Cuál es el producto final de la glucólisis?",
      options: [
        { label: "A", text: "Glucosa" },
        { label: "B", text: "Piruvato" },
        { label: "C", text: "CO₂" },
        { label: "D", text: "H₂O" },
      ],
      correctAnswer: "B",
      topic: "cellular",
    },
    {
      id: 21,
      text: "¿En qué parte de la célula eucariota se lleva a cabo el ciclo de Krebs?",
      options: [
        { label: "A", text: "Citoplasma" },
        { label: "B", text: "Membrana plasmática" },
        { label: "C", text: "Matriz mitocondrial" },
        { label: "D", text: "Espacio intermembranal" },
      ],
      correctAnswer: "C",
      topic: "cellular",
    },
    {
      id: 22,
      text: "¿Cuál es el principal aceptor final de electrones en la cadena respiratoria aeróbica?",
      options: [
        { label: "A", text: "NADH" },
        { label: "B", text: "FADH₂" },
        { label: "C", text: "Oxígeno" },
        { label: "D", text: "ATP" },
      ],
      correctAnswer: "C",
      topic: "cellular",
    },
    {
      id: 23,
      text: "¿Cuántos ATP se producen aproximadamente al final de la cadena respiratoria a partir de una molécula de glucosa?",
      options: [
        { label: "A", text: "4" },
        { label: "B", text: "32" }, // 30-32 es una estimación común y más precisa del neto
        { label: "C", text: "2" },
        { label: "D", text: "38" }, // Valor teórico máximo a menudo citado
      ],
      correctAnswer: "B", // Optando por la estimación neta más aceptada
      topic: "cellular",
    },
    {
      id: 24,
      text: "¿Qué proceso metabólico se realiza en ausencia de oxígeno?",
      options: [
        { label: "A", text: "Respiración aeróbica" },
        { label: "B", text: "Fotosíntesis" },
        { label: "C", text: "Fermentación" },
        { label: "D", text: "Ciclo de Krebs" },
      ],
      correctAnswer: "C",
      topic: "cellular",
    },
    {
      id: 25,
      text: "¿Cuál es el principal producto de la fermentación láctica?",
      options: [
        { label: "A", text: "Etanol" },
        { label: "B", text: "CO₂" },
        { label: "C", text: "Ácido láctico" },
        { label: "D", text: "Glucosa" },
      ],
      correctAnswer: "C",
      topic: "cellular",
    },
    {
      id: 26,
      text: "¿Cuál es la secuencia correcta de las fases de la mitosis?",
      options: [
        { label: "A", text: "Profase, metafase, telofase, anafase" },
        { label: "B", text: "Metafase, anafase, telofase, profase" },
        { label: "C", text: "Profase, metafase, anafase, telofase" },
        { label: "D", text: "Telofase, anafase, metafase, profase" },
      ],
      correctAnswer: "C",
      topic: "cellular",
    },
    {
      id: 27,
      text: "¿Qué ocurre durante la profase de la mitosis?",
      options: [
        {
          label: "A",
          text: "Los cromosomas se separan hacia los polos opuestos.",
        },
        {
          label: "B",
          text: "Los cromosomas se alinean en el ecuador de la célula.",
        },
        {
          label: "C",
          text: "La envoltura nuclear se fragmenta y los cromosomas se condensan.",
        },
        { label: "D", text: "Se forma una nueva envoltura nuclear." },
      ],
      correctAnswer: "C",
      topic: "cellular",
    },
    {
      id: 28,
      text: "¿Qué ocurre durante la anafase de la mitosis?",
      options: [
        {
          label: "A",
          text: "Los cromosomas se alinean en el ecuador de la célula.",
        },
        {
          label: "B",
          text: "Las cromátidas hermanas se separan y se mueven hacia los polos opuestos.",
        },
        { label: "C", text: "La envoltura nuclear se vuelve a formar." },
        { label: "D", text: "Los cromosomas se condensan." },
      ],
      correctAnswer: "B",
      topic: "cellular",
    },
    {
      id: 29,
      text: "¿Qué es la meiosis?",
      options: [
        {
          label: "A",
          text: "Un tipo de división celular que produce células somáticas idénticas.",
        },
        {
          label: "B",
          text: "Un tipo de división celular que reduce el número de cromosomas a la mitad y produce gametos.",
        },
        { label: "C", text: "Un proceso de crecimiento celular." },
        { label: "D", text: "Un proceso de reparación celular." },
      ],
      correctAnswer: "B",
      topic: "cellular",
    },
    {
      id: 30,
      text: "¿Cuántas divisiones celulares ocurren en la meiosis?",
      options: [
        { label: "A", text: "Una" },
        { label: "B", text: "Dos" },
        { label: "C", text: "Tres" },
        { label: "D", text: "Cuatro" },
      ],
      correctAnswer: "B",
      topic: "cellular",
    },
    {
      id: 31,
      text: "¿Qué ocurre durante la meiosis I?",
      options: [
        { label: "A", text: "Separación de cromátidas hermanas." },
        {
          label: "B",
          text: "Reducción del número de cromosomas a la mitad mediante la separación de cromosomas homólogos.",
        },
        { label: "C", text: "Formación de una nueva envoltura nuclear." },
        { label: "D", text: "Condensación de cromosomas." },
      ],
      correctAnswer: "B",
      topic: "cellular",
    },
    {
      id: 32,
      text: "¿Qué ocurre durante la meiosis II?",
      options: [
        { label: "A", text: "Separación de cromosomas homólogos." },
        { label: "B", text: "Separación de cromátidas hermanas." },
        { label: "C", text: "Duplicación del ADN." },
        { label: "D", text: "Recombinación genética." },
      ],
      correctAnswer: "B",
      topic: "cellular",
    },
    {
      id: 33,
      text: "¿Cuál es el resultado de la meiosis?",
      options: [
        { label: "A", text: "Dos células diploides idénticas." },
        {
          label: "B",
          text: "Cuatro células haploides genéticamente diferentes.",
        },
        { label: "C", text: "Dos células haploides idénticas." },
        {
          label: "D",
          text: "Cuatro células diploides genéticamente idénticas.",
        },
      ],
      correctAnswer: "B",
      topic: "cellular",
    },
    {
      id: 34,
      text: "¿Cuál es la importancia de la meiosis para la reproducción sexual?",
      options: [
        { label: "A", text: "Produce células somáticas para el crecimiento." },
        {
          label: "B",
          text: "Mantiene constante el número de cromosomas en cada generación.",
        },
        { label: "C", text: "Asegura la reparación de tejidos dañados." },
        { label: "D", text: "Permite la reproducción asexual." },
      ],
      correctAnswer: "B",
      topic: "reproduction",
    },
    {
      id: 35,
      text: "¿Qué son los gametos?",
      options: [
        { label: "A", text: "Células somáticas diploides." },
        {
          label: "B",
          text: "Células sexuales haploides (óvulos y espermatozoides).",
        },
        { label: "C", text: "Células precursoras de las células nerviosas." },
        { label: "D", text: "Células sanguíneas." },
      ],
      correctAnswer: "B",
      topic: "reproduction",
    },
    {
      id: 36,
      text: "En los mamíferos, ¿cómo se determina genéticamente el sexo?",
      options: [
        { label: "A", text: "Por el número de autosomas." },
        {
          label: "B",
          text: "Por la presencia o ausencia de cromosomas mitocondriales.",
        },
        {
          label: "C",
          text: "Por un par de cromosomas sexuales (XX en hembras y XY en machos).",
        },
        { label: "D", text: "Por factores ambientales." },
      ],
      correctAnswer: "C",
      topic: "genetics",
    },
    {
      id: 37,
      text: "¿Qué son los cromosomas homólogos?",
      options: [
        {
          label: "A",
          text: "Cromosomas idénticos que portan los mismos alelos.",
        },
        {
          label: "B",
          text: "Pares de cromosomas que tienen la misma longitud, posición del centrómero y portan genes para las mismas características.",
        },
        {
          label: "C",
          text: "Cromosomas que se encuentran solo en las células somáticas.",
        },
        {
          label: "D",
          text: "Cromosomas que se encuentran solo en los gametos.",
        },
      ],
      correctAnswer: "B",
      topic: "genetics",
    },
    {
      id: 38,
      text: "¿Qué es un gen?",
      options: [
        { label: "A", text: "Una estructura formada por proteínas y ARN." },
        {
          label: "B",
          text: "Una secuencia de ADN que codifica para una proteína funcional o una molécula de ARN.",
        },
        { label: "C", text: "Un organelo celular que contiene ADN." },
        { label: "D", text: "Una unidad estructural de los carbohidratos." },
      ],
      correctAnswer: "B",
      topic: "genetics",
    },
    {
      id: 39,
      text: "¿Qué es un alelo?",
      options: [
        { label: "A", text: "Una forma alternativa de un gen." },
        {
          label: "B",
          text: "Un segmento del ADN que no codifica para proteínas.",
        },
        { label: "C", text: "Un tipo de ARN mensajero." },
        { label: "D", text: "Una proteína con función enzimática." },
      ],
      correctAnswer: "A",
      topic: "genetics",
    },
    {
      id: 40,
      text: "¿Qué es el genotipo?",
      options: [
        {
          label: "A",
          text: "Las características físicas observables de un organismo.",
        },
        { label: "B", text: "La constitución genética de un organismo." },
        { label: "C", text: "El ambiente en el que vive un organismo." },
        { label: "D", text: "El proceso de replicación del ADN." },
      ],
      correctAnswer: "B",
      topic: "genetics",
    },
    {
      id: 41,
      text: "¿Qué es el fenotipo?",
      options: [
        { label: "A", text: "La constitución genética de un organismo." },
        {
          label: "B",
          text: "Las características físicas observables de un organismo.",
        },
        { label: "C", text: "El conjunto de todos los genes de un organismo." },
        { label: "D", text: "El proceso de transcripción del ARN." },
      ],
      correctAnswer: "B",
      topic: "genetics",
    },
    {
      id: 42,
      text: "¿Qué establece la primera ley de Mendel o ley de la segregación?",
      options: [
        {
          label: "A",
          text: "Los alelos de diferentes genes se segregan independientemente durante la formación de gametos.",
        },
        {
          label: "B",
          text: "Los alelos de un mismo gen se separan durante la formación de gametos, de manera que cada gameto recibe solo un alelo.",
        },
        {
          label: "C",
          text: "Los caracteres se transmiten a la descendencia en bloques ligados.",
        },
        {
          label: "D",
          text: "No hay relación entre la herencia de diferentes caracteres.",
        },
      ],
      correctAnswer: "B",
      topic: "genetics",
    },
    {
      id: 43,
      text: "¿Qué establece la segunda ley de Mendel o ley de la segregación independiente?",
      options: [
        {
          label: "A",
          text: "Los alelos de un mismo gen se separan durante la formación de gametos.",
        },
        {
          label: "B",
          text: "Los alelos de diferentes genes se segregan independientemente unos de otros durante la formación de gametos.",
        },
        {
          label: "C",
          text: "Los caracteres se transmiten a la descendencia siempre juntos.",
        },
        { label: "D", text: "Solo se hereda el carácter dominante." },
      ],
      correctAnswer: "B",
      topic: "genetics",
    },
    {
      id: 44,
      text: "¿Qué tipo de reproducción favorece la variabilidad genética?",
      options: [
        { label: "A", text: "Reproducción asexual" },
        { label: "B", text: "Reproducción sexual" },
        { label: "C", text: "Bipartición" },
        { label: "D", text: "Gemación" },
      ],
      correctAnswer: "B",
      topic: "reproduction",
    },
    {
      id: 45,
      text: "¿Qué es la evolución?",
      options: [
        { label: "A", text: "El desarrollo individual de un organismo." },
        {
          label: "B",
          text: "Los cambios en las características hereditarias de las poblaciones a lo largo del tiempo.",
        },
        { label: "C", text: "El proceso de extinción de las especies." },
        { label: "D", text: "La creación espontánea de nuevos organismos." },
      ],
      correctAnswer: "B",
      topic: "evolution",
    },
    {
      id: 46,
      text: "¿Cuál es el principal mecanismo de la evolución propuesto por Darwin y Wallace?",
      options: [
        { label: "A", text: "Herencia de caracteres adquiridos" },
        { label: "B", text: "Mutación" },
        { label: "C", text: "Selección natural" },
        { label: "D", text: "Deriva génica" },
      ],
      correctAnswer: "C",
      topic: "evolution",
    },
    {
      id: 47,
      text: "¿Qué es la adaptación en el contexto de la evolución?",
      options: [
        {
          label: "A",
          text: "La extinción de una especie debido a cambios ambientales.",
        },
        {
          label: "B",
          text: "Un rasgo hereditario que aumenta la supervivencia y reproducción de un organismo en su ambiente.",
        },
        {
          label: "C",
          text: "El proceso de aislamiento reproductivo entre poblaciones.",
        },
        { label: "D", text: "La migración de organismos a nuevos hábitats." },
      ],
      correctAnswer: "B",
      topic: "evolution",
    },
    {
      id: 48,
      text: "¿Qué es la especiación?",
      options: [
        { label: "A", text: "El proceso de extinción de una especie." },
        {
          label: "B",
          text: "El proceso por el cual una población ancestral se divide en dos o más especies distintas.",
        },
        { label: "C", text: "La migración de organismos a nuevos hábitats." },
        { label: "D", text: "La acumulación de mutaciones en un individuo." },
      ],
      correctAnswer: "B",
      topic: "evolution",
    },
    {
      id: 49,
      text: "¿Cuáles son las principales fuentes de variabilidad genética en las poblaciones?",
      options: [
        { label: "A", text: "Selección natural y adaptación." },
        { label: "B", text: "Mutaciones y recombinación genética." },
        { label: "C", text: "Aislamiento reproductivo y deriva génica." },
        { label: "D", text: "Flujo génico y selección sexual." },
      ],
      correctAnswer: "B",
      topic: "evolution",
    },
    {
      id: 50,
      text: "¿Qué es una mutación?",
      options: [
        { label: "A", text: "Un cambio en el ambiente de un organismo." },
        {
          label: "B",
          text: "Un cambio heredable en la secuencia de ADN de un organismo.",
        },
        {
          label: "C",
          text: "El proceso de recombinación genética durante la meiosis.",
        },
        { label: "D", text: "El movimiento de genes entre poblaciones." },
      ],
      correctAnswer: "B",
      topic: "evolution",
    },
    {
      id: 51,
      text: "¿Qué es la selección natural?",
      options: [
        {
          label: "A",
          text: "La reproducción aleatoria de los individuos de una población.",
        },
        {
          label: "B",
          text: "El proceso por el cual los individuos con ciertos rasgos hereditarios sobreviven y se reproducen a tasas más altas que otros individuos.",
        },
        {
          label: "C",
          text: "La migración de individuos a nuevas áreas geográficas.",
        },
        {
          label: "D",
          text: "La acumulación de mutaciones beneficiosas en una población.",
        },
      ],
      correctAnswer: "B",
      topic: "evolution",
    },
    {
      id: 52,
      text: "¿Qué es la deriva génica?",
      options: [
        { label: "A", text: "El flujo de genes entre poblaciones." },
        {
          label: "B",
          text: "Cambios aleatorios en las frecuencias alélicas de una población de una generación a la siguiente, especialmente en poblaciones pequeñas.",
        },
        {
          label: "C",
          text: "La selección de parejas basada en ciertos rasgos.",
        },
        { label: "D", text: "La aparición de nuevas mutaciones beneficiosas." },
      ],
      correctAnswer: "B",
      topic: "evolution",
    },
    {
      id: 53,
      text: "¿Qué es el flujo génico?",
      options: [
        {
          label: "A",
          text: "Cambios aleatorios en las frecuencias alélicas de una población.",
        },
        {
          label: "B",
          text: "El movimiento de genes hacia o desde una población debido a la migración de individuos o gametos.",
        },
        {
          label: "C",
          text: "La selección de parejas basada en ciertos rasgos.",
        },
        { label: "D", text: "La aparición de nuevas mutaciones." },
      ],
      correctAnswer: "B",
      topic: "evolution",
    },
    {
      id: 54,
      text: "¿Qué es el aislamiento reproductivo?",
      options: [
        {
          label: "A",
          text: "El proceso por el cual las poblaciones intercambian genes libremente.",
        },
        {
          label: "B",
          text: "Los mecanismos que impiden que individuos de diferentes especies se crucen o produzcan descendencia fértil.",
        },
        { label: "C", text: "La migración de individuos a nuevas áreas." },
        { label: "D", text: "La acumulación de mutaciones en una población." },
      ],
      correctAnswer: "B",
      topic: "evolution",
    },
    {
      id: 55,
      text: "¿Cuál es la unidad básica de clasificación taxonómica?",
      options: [
        { label: "A", text: "Reino" },
        { label: "B", text: "Clase" },
        { label: "C", text: "Familia" },
        { label: "D", text: "Especie" },
      ],
      correctAnswer: "D",
      topic: "taxonomy",
    },
    {
      id: 56,
      text: "¿Cuál es el orden jerárquico de la clasificación taxonómica de Linneo (de mayor a menor)?",
      options: [
        {
          label: "A",
          text: "Especie, género, familia, orden, clase, filo, reino",
        },
        {
          label: "B",
          text: "Reino, filo, clase, orden, familia, género, especie",
        },
        {
          label: "C",
          text: "Clase, orden, familia, género, especie, filo, reino",
        },
        {
          label: "D",
          text: "Filo, clase, orden, familia, género, especie, reino",
        },
      ],
      correctAnswer: "B",
      topic: "taxonomy",
    },
    {
      id: 57,
      text: "¿Cuáles son los cinco reinos de Whittaker?",
      options: [
        { label: "A", text: "Animalia, Plantae, Fungi, Protista, Bacteria" },
        { label: "B", text: "Animalia, Plantae, Fungi, Protista, Monera" },
        { label: "C", text: "Animalia, Plantae, Fungi, Virus, Monera" },
        { label: "D", text: "Animalia, Plantae, Fungi, Protista, Archaea" },
      ],
      correctAnswer: "B",
      topic: "taxonomy",
    },
    {
      id: 58,
      text: "¿Cuál es la principal característica de los organismos del reino Monera?",
      options: [
        { label: "A", text: "Células eucariotas" },
        { label: "B", text: "Células procariotas" },
        { label: "C", text: "Organismos multicelulares" },
        { label: "D", text: "Organismos autótrofos fotosintéticos" },
      ],
      correctAnswer: "B",
      topic: "taxonomy",
    },
    {
      id: 59,
      text: "¿A qué reino pertenecen los hongos?",
      options: [
        { label: "A", text: "Plantae" },
        { label: "B", text: "Animalia" },
        { label: "C", text: "Fungi" },
        { label: "D", text: "Protista" },
      ],
      correctAnswer: "C",
      topic: "taxonomy",
    },
    {
      id: 60,
      text: "¿Cuál es la principal característica de los organismos del reino Plantae?",
      options: [
        { label: "A", text: "Son heterótrofos por ingestión." },
        { label: "B", text: "Son procariotas fotosintéticos." },
        { label: "C", text: "Son eucariotas autótrofos fotosintéticos." },
        { label: "D", text: "Son eucariotas heterótrofos por absorción." },
      ],
      correctAnswer: "C",
      topic: "taxonomy", // Podría ser 'plant' también
    },
    {
      id: 61,
      text: "¿Cuál es la principal característica de los organismos del reino Animalia?",
      options: [
        { label: "A", text: "Son autótrofos fotosintéticos." },
        { label: "B", text: "Son procariotas heterótrofos." },
        { label: "C", text: "Son eucariotas heterótrofos por ingestión." },
        { label: "D", text: "Son eucariotas heterótrofos por absorción." },
      ],
      correctAnswer: "C",
      topic: "taxonomy", // Podría ser 'physiology' también
    },
    {
      id: 62,
      text: "¿A qué reino pertenecen los protozoarios?",
      options: [
        { label: "A", text: "Monera" },
        { label: "B", text: "Fungi" },
        { label: "C", text: "Plantae" },
        { label: "D", text: "Protista" },
      ],
      correctAnswer: "D",
      topic: "taxonomy",
    },
    {
      id: 63,
      text: "¿Cuál es la estructura básica de los virus?",
      options: [
        { label: "A", text: "Célula procariota con pared celular." },
        { label: "B", text: "Célula eucariota con núcleo y organelos." },
        {
          label: "C",
          text: "Ácido nucleico (ADN o ARN) rodeado por una cápside proteica.",
        },
        {
          label: "D",
          text: "Membrana plasmática rodeada por una pared celular.",
        },
      ],
      correctAnswer: "C",
      topic: "molecular", // O una categoría 'virology' si existiera
    },
    {
      id: 64,
      text: "¿Cómo se replican los virus?",
      options: [
        { label: "A", text: "Por fisión binaria." },
        { label: "B", text: "Por mitosis." },
        {
          label: "C",
          text: "Utilizando la maquinaria de replicación de una célula huésped.",
        },
        { label: "D", text: "Por meiosis." },
      ],
      correctAnswer: "C",
      topic: "cellular", // O 'virology'
    },
    {
      id: 65,
      text: "¿Qué son las bacterias?",
      options: [
        { label: "A", text: "Organismos eucariotas unicelulares." },
        { label: "B", text: "Organismos procariotas unicelulares." },
        { label: "C", text: "Organismos pluricelulares autótrofos." },
        { label: "D", text: "Organismos pluricelulares heterótrofos." },
      ],
      correctAnswer: "B",
      topic: "taxonomy",
    },
    {
      id: 66,
      text: "¿Cuál es la función de la pared celular en las bacterias?",
      options: [
        {
          label: "A",
          text: "Regular el paso de sustancias hacia dentro y fuera de la célula.",
        },
        { label: "B", text: "Contener el material genético." },
        { label: "C", text: "Proporcionar soporte estructural y protección." },
        { label: "D", text: "Realizar la fotosíntesis." },
      ],
      correctAnswer: "C",
      topic: "cellular", // O 'taxonomy'
    },
    {
      id: 67,
      text: "¿Qué son los plásmidos en las bacterias?",
      options: [
        { label: "A", text: "El material genético principal de la bacteria." },
        { label: "B", text: "Pequeñas moléculas de ADN extracromosómico." },
        {
          label: "C",
          text: "Organelos responsables de la respiración celular.",
        },
        { label: "D", text: "Estructuras utilizadas para el movimiento." },
      ],
      correctAnswer: "B",
      topic: "molecular", // O 'genetics'
    },
    {
      id: 68,
      text: "¿Qué proceso utilizan algunas bacterias para intercambiar material genético directamente?",
      options: [
        { label: "A", text: "Transformación" },
        { label: "B", text: "Transducción" },
        { label: "C", text: "Conjugación" },
        { label: "D", text: "Mutación" },
      ],
      correctAnswer: "C",
      topic: "genetics",
    },
    {
      id: 69,
      text: "¿Qué son los protistas?",
      options: [
        { label: "A", text: "Un grupo diverso de organismos procariotas." },
        {
          label: "B",
          text: "Un grupo diverso de organismos eucariotas, principalmente unicelulares.",
        },
        { label: "C", text: "Organismos pluricelulares autótrofos." },
        { label: "D", text: "Organismos pluricelulares heterótrofos." },
      ],
      correctAnswer: "B",
      topic: "taxonomy",
    },
    {
      id: 70,
      text: "¿Qué son los hongos?",
      options: [
        { label: "A", text: "Organismos procariotas autótrofos." },
        {
          label: "B",
          text: "Organismos eucariotas heterótrofos, principalmente saprofitos.",
        },
        {
          label: "C",
          text: "Organismos eucariotas autótrofos fotosintéticos.",
        },
        {
          label: "D",
          text: "Organismos eucariotas heterótrofos por ingestión.",
        },
      ],
      correctAnswer: "B",
      topic: "taxonomy",
    },
    {
      id: 71,
      text: "¿Cuál es la estructura filamentosa que compone el cuerpo de muchos hongos?",
      options: [
        { label: "A", text: "Pseudópodo" },
        { label: "B", text: "Flagelo" },
        { label: "C", text: "Hifa" },
        { label: "D", text: "Cilio" },
      ],
      correctAnswer: "C",
      topic: "taxonomy", // O 'cellular'
    },
    {
      id: 72,
      text: "¿Qué es el micelio en los hongos?",
      options: [
        { label: "A", text: "La estructura reproductiva del hongo." },
        { label: "B", text: "La pared celular del hongo." },
        {
          label: "C",
          text: "Una red de hifas que constituye el cuerpo vegetativo del hongo.",
        },
        { label: "D", text: "El conjunto de esporas del hongo." },
      ],
      correctAnswer: "C",
      topic: "taxonomy", // O 'cellular'
    },
    {
      id: 73,
      text: "¿Qué función cumplen las plantas en los ecosistemas?",
      options: [
        { label: "A", text: "Son consumidores primarios." },
        { label: "B", text: "Son descomponedores." },
        {
          label: "C",
          text: "Son productores primarios, ya que realizan la fotosíntesis.",
        },
        { label: "D", text: "Son consumidores secundarios." },
      ],
      correctAnswer: "C",
      topic: "ecology",
    },
    {
      id: 74,
      text: "¿Qué son los tejidos vasculares en las plantas (xilema y floema)?",
      options: [
        { label: "A", text: "Tejidos de soporte estructural." },
        { label: "B", text: "Tejidos responsables de la fotosíntesis." },
        {
          label: "C",
          text: "Tejidos especializados en el transporte de agua y nutrientes.",
        },
        { label: "D", text: "Tejidos protectores externos." },
      ],
      correctAnswer: "C",
      topic: "plant",
    },
    {
      id: 75,
      text: "¿Qué son las angiospermas?",
      options: [
        { label: "A", text: "Plantas no vasculares." },
        { label: "B", text: "Plantas vasculares sin semillas." },
        { label: "C", text: "Plantas vasculares con semillas desnudas." },
        {
          label: "D",
          text: "Plantas vasculares con flores y frutos que contienen las semillas.",
        },
      ],
      correctAnswer: "D",
      topic: "plant", // O 'taxonomy'
    },
    {
      id: 76,
      text: "¿Qué son las gimnospermas?",
      options: [
        { label: "A", text: "Plantas no vasculares." },
        { label: "B", text: "Plantas vasculares sin semillas." },
        {
          label: "C",
          text: "Plantas vasculares con semillas desnudas, generalmente en conos.",
        },
        { label: "D", text: "Plantas vasculares con flores y frutos." },
      ],
      correctAnswer: "C",
      topic: "plant", // O 'taxonomy'
    },
    {
      id: 77,
      text: "¿Cuáles son las principales características de los animales?",
      options: [
        { label: "A", text: "Son autótrofos y tienen pared celular." },
        { label: "B", text: "Son procariotas y unicelulares." },
        { label: "C", text: "Son eucariotas, heterótrofos y pluricelulares." },
        { label: "D", text: "Son autótrofos y móviles." },
      ],
      correctAnswer: "C",
      topic: "taxonomy", // O 'physiology'
    },
    {
      id: 78,
      text: "¿Qué tipo de nutrición presentan los animales?",
      options: [
        { label: "A", text: "Autótrofa fotosintética." },
        { label: "B", text: "Autótrofa quimiosintética." },
        { label: "C", text: "Heterótrofa por absorción." },
        { label: "D", text: "Heterótrofa por ingestión." },
      ],
      correctAnswer: "D",
      topic: "physiology",
    },
    {
      id: 79,
      text: "¿Qué es un ecosistema?",
      options: [
        {
          label: "A",
          text: "Una población de organismos de la misma especie.",
        },
        {
          label: "B",
          text: "Una comunidad de diferentes especies interactuando entre sí y con su ambiente físico.",
        },
        {
          label: "C",
          text: "Un grupo de individuos que pueden cruzarse y producir descendencia fértil.",
        },
        {
          label: "D",
          text: "Un área geográfica con clima y vegetación similares.",
        },
      ],
      correctAnswer: "B",
      topic: "ecology",
    },
    {
      id: 80,
      text: "¿Cuáles son los principales componentes de un ecosistema?",
      options: [
        { label: "A", text: "Productores y consumidores." },
        {
          label: "B",
          text: "Factores bióticos (seres vivos) y factores abióticos (componentes no vivos).",
        },
        { label: "C", text: "Atmósfera, hidrosfera y litosfera." },
        { label: "D", text: "Poblaciones y comunidades." },
      ],
      correctAnswer: "B",
      topic: "ecology",
    },
    {
      id: 81,
      text: "¿Qué son los productores en un ecosistema?",
      options: [
        {
          label: "A",
          text: "Organismos que se alimentan de otros organismos.",
        },
        {
          label: "B",
          text: "Organismos que descomponen la materia orgánica muerta.",
        },
        {
          label: "C",
          text: "Organismos autótrofos que producen su propio alimento, como las plantas.",
        },
        { label: "D", text: "Organismos que se alimentan de productores." },
      ],
      correctAnswer: "C",
      topic: "ecology",
    },
    {
      id: 82,
      text: "¿Qué son los consumidores en un ecosistema?",
      options: [
        {
          label: "A",
          text: "Organismos autótrofos que producen su propio alimento.",
        },
        { label: "B", text: "Organismos que descomponen la materia orgánica." },
        {
          label: "C",
          text: "Organismos heterótrofos que obtienen energía al alimentarse de otros organismos.",
        },
        { label: "D", text: "Componentes no vivos del ecosistema." },
      ],
      correctAnswer: "C",
      topic: "ecology",
    },
    {
      id: 83,
      text: "¿Qué son los descomponedores en un ecosistema?",
      options: [
        { label: "A", text: "Organismos que producen su propio alimento." },
        {
          label: "B",
          text: "Organismos heterótrofos que obtienen energía al descomponer la materia orgánica muerta, como bacterias y hongos.",
        },
        {
          label: "C",
          text: "Organismos que se alimentan de otros consumidores.",
        },
        { label: "D", text: "Productores primarios." },
      ],
      correctAnswer: "B",
      topic: "ecology",
    },
    {
      id: 84,
      text: "¿Qué es una cadena trófica o cadena alimentaria?",
      options: [
        {
          label: "A",
          text: "El conjunto de todas las interacciones alimentarias en un ecosistema.",
        },
        {
          label: "B",
          text: "La transferencia de energía de un nivel trófico a otro a través de la alimentación.",
        },
        {
          label: "C",
          text: "La descomposición de la materia orgánica muerta.",
        },
        { label: "D", text: "La producción de alimento por los autótrofos." },
      ],
      correctAnswer: "B",
      topic: "ecology",
    },
    {
      id: 85,
      text: "¿Qué es una red trófica o red alimentaria?",
      options: [
        {
          label: "A",
          text: "Una secuencia lineal de organismos donde cada uno se alimenta del anterior.",
        },
        {
          label: "B",
          text: "Un conjunto interconectado de cadenas tróficas en un ecosistema.",
        },
        { label: "C", text: "El flujo de energía en un solo nivel trófico." },
        {
          label: "D",
          text: "La competencia entre organismos por los recursos.",
        },
      ],
      correctAnswer: "B",
      topic: "ecology",
    },
    {
      id: 86,
      text: "¿Qué es la fotosíntesis?",
      options: [
        {
          label: "A",
          text: "El proceso de liberación de energía a partir de la glucosa en presencia de oxígeno.",
        },
        {
          label: "B",
          text: "El proceso de descomposición de la materia orgánica muerta.",
        },
        {
          label: "C",
          text: "El proceso por el cual los organismos autótrofos capturan energía lumínica y la utilizan para sintetizar moléculas orgánicas a partir de CO₂ y H₂O.",
        },
        {
          label: "D",
          text: "El proceso de fermentación en ausencia de oxígeno.",
        },
      ],
      correctAnswer: "C",
      topic: "cellular", // O 'plant'
    },
    {
      id: 87,
      text: "¿Cuál es la ecuación general de la fotosíntesis?",
      options: [
        { label: "A", text: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + Energía" },
        { label: "B", text: "6CO₂ + 6H₂O + Energía lumínica → C₆H₁₂O₆ + 6O₂" },
        { label: "C", text: "Glucosa → Ácido láctico + Energía" },
        { label: "D", text: "Glucosa → Etanol + CO₂ + Energía" },
      ],
      correctAnswer: "B",
      topic: "cellular",
    },
    {
      id: 88,
      text: "¿Qué es la respiración celular aeróbica?",
      options: [
        {
          label: "A",
          text: "El proceso de producción de glucosa a partir de CO₂ y H₂O utilizando energía lumínica.",
        },
        {
          label: "B",
          text: "El proceso de liberación de energía a partir de la glucosa en ausencia de oxígeno.",
        },
        {
          label: "C",
          text: "El proceso de liberación de energía a partir de la glucosa en presencia de oxígeno.",
        },
        {
          label: "D",
          text: "El proceso de descomposición de moléculas orgánicas complejas en moléculas más simples.",
        },
      ],
      correctAnswer: "C",
      topic: "cellular",
    },
    {
      id: 89,
      text: "¿Cuál es la ecuación general de la respiración celular aeróbica?",
      options: [
        { label: "A", text: "6CO₂ + 6H₂O + Energía lumínica → C₆H₁₂O₆ + 6O₂" },
        { label: "B", text: "Glucosa → Ácido láctico + Energía" },
        { label: "C", text: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + Energía" },
        { label: "D", text: "Glucosa → Etanol + CO₂ + Energía" },
      ],
      correctAnswer: "C",
      topic: "cellular",
    },
    {
      id: 90,
      text: "¿Qué es la homeostasis?",
      options: [
        {
          label: "A",
          text: "La capacidad de los organismos para crecer y desarrollarse.",
        },
        {
          label: "B",
          text: "La capacidad de los organismos para reproducirse.",
        },
        {
          label: "C",
          text: "La capacidad de los organismos para mantener un ambiente interno estable.",
        },
        {
          label: "D",
          text: "La capacidad de los organismos para responder a estímulos.",
        },
      ],
      correctAnswer: "C",
      topic: "physiology",
    },
    {
      id: 91,
      text: "¿Qué es el metabolismo?",
      options: [
        {
          label: "A",
          text: "El conjunto de todos los procesos físicos de un organismo.",
        },
        {
          label: "B",
          text: "El conjunto de todas las reacciones químicas que ocurren dentro de un organismo.",
        },
        { label: "C", text: "La capacidad de un organismo para moverse." },
        {
          label: "D",
          text: "La capacidad de un organismo para excretar desechos.",
        },
      ],
      correctAnswer: "B",
      topic: "cellular", // O 'physiology'
    },
    {
      id: 92,
      text: "¿Qué es el anabolismo?",
      options: [
        {
          label: "A",
          text: "La descomposición de moléculas complejas en moléculas más simples, liberando energía.",
        },
        {
          label: "B",
          text: "La síntesis de moléculas complejas a partir de moléculas más simples, requiriendo energía.",
        },
        {
          label: "C",
          text: "El transporte de sustancias a través de las membranas celulares.",
        },
        { label: "D", text: "La replicación del ADN." },
      ],
      correctAnswer: "B",
      topic: "cellular",
    },
    {
      id: 93,
      text: "¿Qué es el catabolismo?",
      options: [
        {
          label: "A",
          text: "La síntesis de moléculas complejas a partir de moléculas más simples, requiriendo energía.",
        },
        {
          label: "B",
          text: "La descomposición de moléculas complejas en moléculas más simples, liberando energía.",
        },
        { label: "C", text: "La regulación de la expresión génica." },
        { label: "D", text: "La división celular." },
      ],
      correctAnswer: "B",
      topic: "cellular",
    },
    {
      id: 94,
      text: "¿Qué son las enzimas?",
      options: [
        {
          label: "A",
          text: "Moléculas de almacenamiento de energía a largo plazo.",
        },
        { label: "B", text: "Moléculas que transportan oxígeno en la sangre." },
        {
          label: "C",
          text: "Catalizadores biológicos, principalmente proteínas, que aceleran las reacciones químicas.",
        },
        {
          label: "D",
          text: "Componentes estructurales de las membranas celulares.",
        },
      ],
      correctAnswer: "C",
      topic: "molecular", // O 'cellular'
    },
    {
      id: 95,
      text: "¿Cuál es la función de una enzima?",
      options: [
        {
          label: "A",
          text: "Proporcionar energía para las reacciones químicas.",
        },
        {
          label: "B",
          text: "Aumentar la energía de activación requerida para una reacción.",
        },
        {
          label: "C",
          text: "Disminuir la energía de activación requerida para una reacción, acelerando el proceso.",
        },
        { label: "D", text: "Consumirse durante la reacción química." },
      ],
      correctAnswer: "C",
      topic: "molecular", // O 'cellular'
    },
    {
      id: 96,
      text: "¿Qué es el sitio activo de una enzima?",
      options: [
        { label: "A", text: "Toda la superficie de la molécula enzimática." },
        {
          label: "B",
          text: "La región de la enzima donde se une el sustrato y ocurre la catálisis.",
        },
        { label: "C", text: "La parte de la enzima que se une a un cofactor." },
        {
          label: "D",
          text: "La región de la enzima que se une a un inhibidor.",
        },
      ],
      correctAnswer: "B",
      topic: "molecular", // O 'cellular'
    },
    {
      id: 97,
      text: "¿Qué factores pueden afectar la actividad enzimática?",
      options: [
        { label: "A", text: "Solo la temperatura." },
        { label: "B", text: "Solo el pH." },
        { label: "C", text: "Temperatura, pH y concentración del sustrato." },
        { label: "D", text: "Solo la presión." },
      ],
      correctAnswer: "C",
      topic: "molecular", // O 'cellular'
    },
    {
      id: 98,
      text: "¿Qué son las hormonas?",
      options: [
        { label: "A", text: "Enzimas que catalizan reacciones metabólicas." },
        {
          label: "B",
          text: "Moléculas señalizadoras producidas por glándulas endocrinas que regulan procesos fisiológicos.",
        },
        {
          label: "C",
          text: "Anticuerpos que defienden al organismo contra patógenos.",
        },
        {
          label: "D",
          text: "Neurotransmisores que transmiten señales entre neuronas.",
        },
      ],
      correctAnswer: "B",
      topic: "physiology",
    },
    {
      id: 99,
      text: "¿Qué son los anticuerpos?",
      options: [
        {
          label: "A",
          text: "Moléculas señalizadoras que regulan el metabolismo.",
        },
        {
          label: "B",
          text: "Proteínas producidas por el sistema inmunitario que reconocen y neutralizan patógenos.",
        },
        {
          label: "C",
          text: "Enzimas que aceleran las reacciones químicas en el sistema inmunitario.",
        },
        { label: "D", text: "Células especializadas del sistema nervioso." },
      ],
      correctAnswer: "B",
      topic: "health", // O 'physiology'
    },
    {
      id: 100,
      text: "¿Cuál es la función principal del sistema inmunológico?",
      options: [
        { label: "A", text: "Transportar oxígeno y nutrientes a las células." },
        {
          label: "B",
          text: "Regular la temperatura corporal y el equilibrio hídrico.",
        },
        {
          label: "C",
          text: "Defender al organismo contra patógenos y otras sustancias extrañas.",
        },
        {
          label: "D",
          text: "Eliminar los productos de desecho del metabolismo celular.",
        },
      ],
      correctAnswer: "C",
      topic: "health", // O 'physiology'
    },
  ];

  // Categorías de temas - puedes expandirlo según necesites
  const topicCategories = {
    all: "Todos los temas",
    cellular: "Biología Celular",
    molecular: "Biología Molecular",
    genetics: "Genética",
    evolution: "Evolución",
    reproduction: "Reproducción",
    ecology: "Ecología",
    taxonomy: "Taxonomía",
    health: "Salud",
    physiology: "Fisiología",
    plant: "Biología Vegetal",
  };

  // Timer effect
  useEffect(() => {
    let timer;
    if (
      examStarted &&
      !examSubmitted &&
      timeRemaining > 0 &&
      examMode === "full"
    ) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setExamSubmitted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examStarted, examSubmitted, timeRemaining, examMode]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleOptionSelect = (questionIndex, optionLabel) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionIndex]: optionLabel,
    }));
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleSubmitExam = () => {
    setExamSubmitted(true);
    setShowResults(true);
  };

  const handleStartExam = (mode) => {
    setExamMode(mode);
    setExamStarted(true);
    if (mode === "review") {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedOptions[index] === question.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100),
    };
  };

  const getFilteredQuestions = () => {
    return questions.filter((q) => {
      // Filter by topic
      const topicMatch = filterTopic === "all" || q.topic === filterTopic;

      // Filter by search term
      const searchMatch =
        q.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.options.some((opt) =>
          opt.text.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      return topicMatch && searchMatch;
    });
  };

  const filteredQuestions = getFilteredQuestions();

  // Welcome screen
  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Examen de Biología UNAM
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                100 preguntas de opción múltiple para preparación del examen de
                biología
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-blue-800 mb-2">
                  Instrucciones
                </h2>
                <ul className="list-disc pl-5 text-blue-700 space-y-1">
                  <li>
                    Este examen contiene {questions.length} preguntas de opción
                    múltiple
                  </li>
                  <li>
                    En modo "Examen Completo" tienes 100 minutos para
                    completarlo
                  </li>
                  <li>
                    En modo "Práctica" puedes navegar libremente y revisar
                    respuestas
                  </li>
                  <li>
                    En modo "Revisión" puedes ver las respuestas correctas
                    inmediatamente
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <button
                  onClick={() => handleStartExam("full")}
                  className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition duration-200 flex flex-col items-center justify-center"
                >
                  <span className="text-lg">Examen Completo</span>
                  <span className="text-sm mt-1">Con tiempo limitado</span>
                </button>

                <button
                  onClick={() => handleStartExam("practice")}
                  className="w-full py-4 px-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow transition duration-200 flex flex-col items-center justify-center"
                >
                  <span className="text-lg">Modo Práctica</span>
                  <span className="text-sm mt-1">Sin límite de tiempo</span>
                </button>

                <button
                  onClick={() => handleStartExam("review")}
                  className="w-full py-4 px-6 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow transition duration-200 flex flex-col items-center justify-center"
                >
                  <span className="text-lg">Modo Revisión</span>
                  <span className="text-sm mt-1">Ver respuestas correctas</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show results page
  if (showResults) {
    const score = calculateScore();

    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-center mb-4">
                Resultados del Examen
              </h1>

              {examMode === "full" && (
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <div className="text-center">
                    <p className="text-lg">
                      Tu puntuación:{" "}
                      <span className="font-bold">
                        {score.correct} de {score.total}
                      </span>
                    </p>
                    <div className="w-full bg-gray-300 rounded-full h-4 mt-2">
                      <div
                        className={`h-4 rounded-full ${
                          score.percentage >= 80
                            ? "bg-green-500"
                            : score.percentage >= 60
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${score.percentage}%` }}
                      ></div>
                    </div>
                    <p className="font-bold text-xl mt-2">
                      {score.percentage}%
                    </p>
                    <p className="mt-1">
                      {score.percentage >= 80
                        ? "¡Excelente! Estás muy bien preparado."
                        : score.percentage >= 60
                          ? "Buen trabajo. Sigue estudiando las áreas de oportunidad."
                          : "Necesitas reforzar varios temas. ¡No te desanimes!"}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-col md:flex-row mb-4 space-y-2 md:space-y-0 md:space-x-2">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Buscar preguntas..."
                    className="w-full px-4 py-2 border rounded-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="px-4 py-2 border rounded-lg"
                  value={filterTopic}
                  onChange={(e) => setFilterTopic(e.target.value)}
                >
                  {Object.entries(topicCategories).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              {filteredQuestions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No se encontraron preguntas con los criterios de búsqueda.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredQuestions.map((question, idx) => {
                    const isCorrect =
                      selectedOptions[questions.indexOf(question)] ===
                      question.correctAnswer;
                    const topicName =
                      topicCategories[question.topic] || question.topic;

                    return (
                      <div
                        key={question.id}
                        className={`border rounded-lg p-4 ${
                          !selectedOptions[questions.indexOf(question)]
                            ? "border-gray-300"
                            : isCorrect
                              ? "border-green-300 bg-green-50"
                              : "border-red-300 bg-red-50"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg">
                            Pregunta {question.id}
                          </h3>
                          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {topicName}
                          </span>
                        </div>
                        <p className="mb-3">{question.text}</p>
                        <div className="space-y-2">
                          {question.options.map((option) => {
                            const isSelected =
                              selectedOptions[questions.indexOf(question)] ===
                              option.label;
                            const isCorrectOption =
                              option.label === question.correctAnswer;

                            let optionClassName =
                              "block p-2 border rounded-md ";
                            if (isSelected && isCorrectOption) {
                              optionClassName +=
                                "bg-green-100 border-green-500";
                            } else if (isSelected && !isCorrectOption) {
                              optionClassName += "bg-red-100 border-red-500";
                            } else if (
                              isCorrectOption &&
                              examMode === "review"
                            ) {
                              optionClassName += "bg-green-50 border-green-300";
                            } else {
                              optionClassName += "border-gray-300";
                            }

                            return (
                              <div
                                key={option.label}
                                className={optionClassName}
                              >
                                <span className="font-medium">
                                  {option.label}){" "}
                                </span>
                                {option.text}
                                {isCorrectOption && examMode === "review" && (
                                  <span className="ml-2 text-green-600">
                                    ✓ Respuesta correcta
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setSelectedOptions({});
                    setExamStarted(false);
                    setExamSubmitted(false);
                    setShowResults(false);
                    setTimeRemaining(60 * 100);
                    setCurrentQuestionIndex(0);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Volver al inicio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main exam interface
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold">Examen de Biología UNAM</h1>
              {examMode === "full" && (
                <div className="text-right">
                  <p className="text-sm text-gray-500">Tiempo restante</p>
                  <p
                    className={`font-bold text-lg ${timeRemaining < 300 ? "text-red-600" : ""}`}
                  >
                    {formatTime(timeRemaining)}
                  </p>
                </div>
              )}
            </div>

            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">
                  Pregunta {questions[currentQuestionIndex]?.id} de{" "}
                  {questions.length}
                </span>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {topicCategories[questions[currentQuestionIndex]?.topic] ||
                    "Sin categoría"}
                </span>
              </div>
              <div className="w-full bg-gray-300 h-2 mt-2 rounded-full">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-medium mb-3">
                {questions[currentQuestionIndex]?.text}
              </h2>
              <div className="space-y-2">
                {questions[currentQuestionIndex]?.options.map((option) => (
                  <div
                    key={option.label}
                    onClick={() =>
                      handleOptionSelect(currentQuestionIndex, option.label)
                    }
                    className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedOptions[currentQuestionIndex] === option.label
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                  >
                    <span className="font-medium">{option.label}) </span>
                    {option.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
                className={`px-4 py-2 rounded-lg ${
                  currentQuestionIndex === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                Anterior
              </button>

              {currentQuestionIndex === questions.length - 1 ? (
                <button
                  onClick={handleSubmitExam}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Finalizar Examen
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Siguiente
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium mb-3">
              Navegación de preguntas
            </h2>
            <div className="grid grid-cols-10 gap-2">
              {questions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-full aspect-square flex items-center justify-center rounded-md text-sm font-medium
                    ${
                      currentQuestionIndex === index
                        ? "bg-blue-600 text-white"
                        : selectedOptions[index]
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-200 text-gray-800"
                    }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-100 rounded-sm mr-1"></div>
                  <span className="text-sm">Respondida</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-200 rounded-sm mr-1"></div>
                  <span className="text-sm">Sin responder</span>
                </div>
              </div>

              <button
                onClick={handleSubmitExam}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Finalizar Examen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiologyExam;
