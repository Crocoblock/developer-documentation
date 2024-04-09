# Global JetEngine Actions (not directly related to any component)

## jet-engine/init

Еккшн спрацьовую після ініціалізації всіх частин ДжетЕнжин. В цей момент вже доступні всі компоненти і активні модулі. Сутності ДжетЕнжин, які створені юзером (типи постів, сторінки опцій, релейшени і тп) в цей момент ще не зареєстрвоані.

**Args:**
- `$jet_engine` - Екземпляр класу Jet_Engine, аналогічний тому, який повертає функція jet_engine()

**Location:**
/jet-engine.php

**Access:**
Global

**Example:**

```php
add_action( 'jet-engine/init', function( $jet_engine ) {
  // Може використовуватись замість перевірки на те встановлений ДжетЕНжин чи ні
  // Цей хук спрацьовує тільки при ініті Енжина, так що з нього безпечно звертатися до всіх компонентів
} );
```

## jet-engine/components/registered

Еккшн спрацьовую після реєстрації компонентів ДжетЕнжин. Може використовуватись для реєстрації своїх компонентів або дереєстрації існуючіх. Дереєстрація в теорії можлива, але з цим треба обережно, бо деякі компоненти занадто інтегровані в ядро і це може призвести до помилок

**Args:**
- `$components_manager` - Екземпляр класу менеджеру компонентів, з якого можна викликати методи реєстрації і дереєстрації
- `$jet_engine` - Екземпляр класу JetEngine

**Location:**
/includes/core/components-manager.php

**Access:**
Global

**Example:**

```php
add_action( 'jet-engine/components/registered', function( $components_manager ) {
  $components_manager->deregister_component( 'glossaries );
} );
```