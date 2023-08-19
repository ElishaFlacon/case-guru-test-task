import { UserDto } from "src/users/dto/user.dto";


// получаем дату начала месяца и конца месяца, почти точно :) 
export const getMonthStartEndPoints = () => {
    const startMonth = new Date(new Date().setDate(new Date().getDate() - new Date().getDate() + 1));
    const endMonth = new Date(new Date().setDate(new Date().getDate() - new Date().getDate() + 31));
    return { startMonth, endMonth };
}

// получаем дату начала года и конца года, почти точно :) 
export const getYearStartEndPoints = () => {
    const startYear = new Date(
        new Date(new Date().setDate(new Date().getDate() - new Date().getDate()))
            .setMonth(new Date().getMonth() - new Date().getMonth() - 1)
    );
    const endYear = new Date(
        new Date(new Date().setDate(new Date().getDate() - new Date().getDate()))
            .setMonth(new Date().getMonth() - new Date().getMonth() - 1)
    );
    return { startYear, endYear };
}

// получаем дату ровно год назад
export const getOneYearAgo = () => new Date(new Date().setFullYear(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate()));

// получаем текущий месяц
export const getCurrentMonth = () => new Date().getMonth();

// получаем текущий год
export const getCurrentYear = () => new Date().getFullYear();

// получаем список всех месяцев начиная от текущего и заканчивая текущим - 11 месяцев
// пример возвращаемого значения (текущий месяц август): 
// ["август", "июль", "июнь", "май", "апрель", "март", "февраль", "январь", "декабрь", "ноябрь", "октябрь", "сентябрь"]
export const getPreviosMonths = () => {
    const currentMonth = getCurrentMonth();

    const months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
    const newMonths: string[] = [];

    for (let i = 0; i < months.length; i++) {
        if (currentMonth >= i) {
            newMonths[i] = months[currentMonth - i];
            continue;
        }
        newMonths[i] = months[currentMonth - i + 12];
    }

    return newMonths;
}

// получаем массив с суммой зарплат по месяцам
// где 0 индекс массива, это текущий месяц, а остальные 11, это прошлые месяца
export const getMonthSalary = (users: UserDto[]) => {
    const oneYearAgo = getOneYearAgo().getFullYear();
    const currentMonth = getCurrentMonth();

    const monthSalary = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    users.forEach((user) => {
        const hiringDate = new Date(user.date_of_hiring);
        const hiringYear = hiringDate.getFullYear();
        const hiringMonth = hiringDate.getMonth();

        // проверка, что сотрудник был нанят больше чем год назад от текущего года (проверка по году)
        if (hiringYear < oneYearAgo) {
            for (let i = 0; i < monthSalary.length; i++) {
                monthSalary[i] += user.POLUCHKA;
            }
        }

        // проверка, что сотрудник был нанят год назад от текущего года (проверка по году)
        if (hiringYear === oneYearAgo) {
            for (let i = 0; i < monthSalary.length; i++) {
                // проверка на сотрудника который работает больше года
                // потому что сюда может попасть человек с датой устройства 2022-06-01
                // а значит он уже работает год и 2 месяца, если взять, что сегодня 2023-08-01
                if (currentMonth >= hiringMonth) {
                    monthSalary[i] += user.POLUCHKA;
                    continue;
                }

                // если человек работает меньше года, допустим устроился 2022-10-01, а сейчас 2023-08-01
                // то он работает только 10 месяцев
                if (i <= currentMonth - hiringMonth + 12) {
                    monthSalary[i] += user.POLUCHKA;
                }
            }
        }

        // проверка, что сотрудник был нанят в этом году (проверка по году)
        if (hiringYear > oneYearAgo) {
            for (let i = 0; i < monthSalary.length; i++) {
                // эта проверка оберегает нас от ситуации, когда человек только устроится 2023-09-01, 
                // но он уже есть в бд, а сейчас только 2023-08-01
                if (currentMonth - hiringMonth >= i) {
                    monthSalary[i] += user.POLUCHKA;
                }
            }
        }
    });

    return monthSalary;
}

