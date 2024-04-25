# Booking Update Action via JetFormBuilder

За допомогою JetFormBuilder можна легко створити форму, яка дозволить користувачам оновити існуюче бронювання. Ця форма може 
містити поля для введення інформації про бронювання, такі як статус, дати, тип кімнати бронювання, тощо.

Для реалізації функціональності оновлення бронювання було створено нову подію відповідальну за це:

![Booking Update Action](/06-jet-booking/03-features/03-booking-update-action/assets/booking-update-action.png "Екшн оновлення бронювання")

Подія містить в собі налаштування. `Booking ID` є обов'язковим полем, яке необхідне для ідентифікації відповідного бронювання та
порівняння з іншими бронюваннями.

![Booking Update Action Settings](/06-jet-booking/03-features/03-booking-update-action/assets/booking-update-action-settings.png "Налаштування екшину оновлення бронювання")

Всі опції в налаштуваннях події містять в собі вибір полів форми які пов'язуються з параметрами бронювання.

### Створення форми для оновлення бронювання з лістингу JetEngine

В такому випадку форму можна буде використовувати, як безпосередньо в лістингу бронювань, так і в попапі, створеного за допомогою 
плагіну JetPopups. Сам лістинг повинен бути створений за допомогою JetEngine Query Builder типу JetBooking Query.

Під час створення форми треба переконатись, що вона обов'язково містить приховане поле та поле дат (Check in/out dates). В прихованому полі
треба налаштувати його правильне значення обравши `Current Booking ID`. Це значення зареєстровано спеціально для бронювань 
які виводитимуться за допомогою описаного вище способу (в лістингу за допомогою JetBooking Query).

Додавання інших полів є опціональним і залежить від того що саме власник сайту хоче дозволити редагувати.

Для отримання значень бронювання в відповідні поля перед початком редагування використовуються пресети.

![Booking Default Value Presets](/06-jet-booking/03-features/03-booking-update-action/assets/default-value-presets.png "Пресети значень")

В пресетах створено нове джерело отримання даних, спеціально для редагування бронювань, відносно якого будуть показуватися 
поля для отримання даних бронювання. В даному випадку треба обрати звідки буде братись ідентифікатор бронювання, а також налаштувати
які саме данні будуть встановлюватись.

У випадку з використанням в лістингу, треба обрати `Current Post` щоб данні бронювання брались з поточного елементу лістингу.

### Створення форми для оновлення бронювання з в JetEngine Profile Builder

> Для даного способу не обов'язково використовувати саме JetEngine Profile Builder, можна й інше рішення яке допоможе відтворити 
> необхідну структуру та посилання.

Під час створення форми треба переконатись, що вона обов'язково містить приховане поле та поле дат (Check in/out dates). В прихованому полі
треба налаштувати його правильне значення обравши `URL Query Variable` та в додатковому полі ключа вказати змінну яка буде зберігати значення
ідентифікатора бронювання.

Додавання інших полів є опціональним і залежить від того що саме власник сайту хоче дозволити редагувати.

Для отримання значень бронювання в відповідні поля перед початком редагування використовуються пресети. 

В даному випадку вони налаштовуються по іншому. В полі отримання ідентифікатора бронювання треба обрати `URL Query Variable`
та в додатковому полі ключа вказати змінну яка буде зберігати значення ідентифікатора бронювання.

Якщо створюється форма з можливістю оновлення статусу бронювання, то для цього випадку створено спеціальний динамічний генератор
для отримання всіх можливих статусів бронювання.

![Booking Get Status List](/06-jet-booking/03-features/03-booking-update-action/assets/generate-dynamically-bookings-status-list.png "Отримання списку статусів бронювань")

За допомогою генератора можна отримати відформатований список зі значенням і назвою всіх можливих статусів. Як показано на зображені вище,
можна також задати імя поля, однак це специфічний параметр і його треба задати правильно, щоб отримати більш конкретні статуси.
Якщо воно буде пусте то ми отримаємо всі можливі статуси.

Саме по собі поле може приймати лише 2 параметри valid або invalid можливе передання одразу двох параметрів, але їх треба розділити 
обов'язково через | (вертикальну риску). В такому випадку буде отримано одразу два типи статусів. Послідовність задання параметрів не важлива.