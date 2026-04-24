import { Dispatch, SetStateAction } from "react";

import LessonPanelList from "@/components/Lesson/LessonPanel/LessonPanelList/LessonPanelList";
import Theory from "@/components/Lesson/LessonPanel/Theory/Theory";
import styles from './LessonPanel.module.scss';

interface LessonPanelProps {
    isPanelActive: boolean, 
    setIsPanelActive: Dispatch<SetStateAction<boolean>>
}

const LessonPanel = ({ isPanelActive, setIsPanelActive }: LessonPanelProps) => {
    return (
        <div className={styles['lesson-panel']}>
            <LessonPanelList isPanelActive={isPanelActive} setIsPanelActive={setIsPanelActive} />

            {isPanelActive && <Theory setIsPanelActive={setIsPanelActive} />}
        </div>
    );
}

export default LessonPanel;

// - [x] Сделано
// - [ ] Не сделано

// ![screen](https://htmlacademy.ru/assets/courses/299/browser-title@2x.png)

// ~~~js
// let user = {     // объект
//   name: "John",  // под ключом "name" хранится значение "John"
//   age: 30        // под ключом "age" хранится значение 30
// };
// ~~~

// | Символ | Описание |
// | -------- | -------- |
// | ${"`n`"}     | Перевод строки     |
// | a, b     | В текстовых файлах Windows для перевода строки используется комбинация символов, а на других ОС это просто n. Это так по историческим причинам, ПО под Windows обычно понимает и просто.     |
// | n     | Перевод строки     |

// https://google.com

// # Практика №7
// # Практика №7
// ## Практика №7
// ### Практика №7
// #### Практика №7
// ##### Практика №7
// ###### Практика №7
// ####### Практика №7

// db.php:


// Также существует специальный оператор ${"`in`"} для проверки существования свойства в объекте.

// 1. Первое свойство с именем "name" и значением "John".
// 2. Второе свойство с именем "age" и значением 30.
// 3. * Ключи свойств должны быть строками или символами (обычно строками). 
//    * Значения могут быть любого типа.

// Как мы знаем из главы [Типы данных](http://a.com), в JavaScript существует 8 типов данных. Семь из них называются «примитивными», так как содержат только одно значение (будь то строка, число или что-то другое).


// * Ключи свойств должны быть строками или символами (обычно строками).
// * Значения могут быть любого типа.

// **Переменная, которой присвоен объект, хранит не сам объект, а его «адрес в памяти» – другими словами, «ссылку» на него.**

// > blockquote !!!!!!
// ***

// Основной концепцией управления памятью в JavaScript является принцип *достижимости*.