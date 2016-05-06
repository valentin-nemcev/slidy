# О проекте

**[Slidy](https://valentin-nemcev.github.io/slidy/)** — движок для презентаций.

Этот документ — сопроводительное описание к тестовому заданию на вакансию
[Разработчика интерфейсов](https://yandex.ru/jobs/vacancies/dev/dev_int_yaservices_spb/)
в Яндексе.

## Задание

> Реализуйте систему для показа презентаций. Подумайте над тем, как реализовать
переключение слайдов, навигацию. Предусмотрите возможность размещения
нескольких презентаций на одной странице. Рекомендуется использование jQuery.

Я решил интерпретировать задание больше как «Движок для презентаций», чем
«Плагин для jQuery», чтобы приблизить его к своим целям.


## Цели

* **Заинтересовать Яндекс**  
  В особенности продемонстрировать навыки кроссбраузерной верстки, умение
  делать продукт от начала до конца и умение разбираться с новыми технологиями
  фронтенда, а также компенсировать полное отсутствие документации и общий
  аутизм других моих проектов.

* **Сделать себе замену PowerPoint**  
  [Shower](https://shwr.me/) хорош, но всегда приятно иметь собственный
  инструмент. Кроме того, мне хотелось реализовать несколько очень специфичных
  особенностей.

* Полностью посвятить проекту несколько дней и получить минимальный готовый к
  использованию продукт.


## Технологии

* ES6, [Babel](https://babeljs.io/)
* [Stylus](http://stylus-lang.com/), [Axis](http://axis.netlify.com/),
 [Kouoto Swiss](http://kouto-swiss.io/)
* HTML5, CSS3
* jQuery
* [Mocha](https://mochajs.org/), [Chai](http://chaijs.com/), [Sinon](http://sinonjs.org/)
* [ESLint](http://eslint.org/)
* [ESDoc](https://esdoc.org)
* [Gulp](http://gulpjs.com/), [Browserify](http://browserify.org/)
* npm
* Прочие мелкие [библиотеки](/package.json) из npm


## Что удалось узнать

Вещи, с которыми удалось поработать в первый раз:

* Stylus и друзья
* CSS3: Flexbox, Viewport units, @media queries, адаптивная верстка
* Gulp
* ESDoc
* GitHub Pages


## Чего не хватает

**БЭМ**: хотелось познакомиться с этой методологией и использовать еe в проекте,
но реальной возможности пока не возникло.

**Интеграционное тестирование**: этот проект — хороший повод впечатлить
работодателя и попробовать [Gemini](https://github.com/gemini-testing/gemini)
(верстка презентации никогда не должна «ехать»!), но у меня не хватило времени.

**Модульность и встраиваемость**: «Возможность размещения презентаций на одной
странице» — первостепенное требование к качеству кода от Яндекса, но
второстепенное требование для продукта. Сейчас такой возможности нет, но я
постарался сделать код максимально модульным и предусмотреть эту возможность в
будущем.

**npm-пакет**: пока не готов к публикации, нужно много чего доделать и в целом
решить, как предполагается его использовать.


## Проблемы


Адаптивная верстка с подстройкой под соотношение сторон экрана — эта
слегка безумная идея на практике оказалась не такой многообещающей, как
показалось вначале. Техническая реализация предоставила интересный challenge,
но итоговый результат обладает неустранимыми ограничениями и работает не идеально.
Код также не очень хорош, по ощущениям последние 5% точности результата будут
стоить килобайта формул на смеси Stylus и CSS calc expressions.

В целом, стили — самое слабое место проекта в плане качества кода, в будущем я
хотел бы научиться сразу писать модульный CSS-код. (Я написал это предложение и
понял, что как раз БЭМ-то мне и нужно было использовать с самого начала...
Запишу это как еще одну проблему)

chai-jquery — я совершил ошибку, потратив слишком много времени на
разбирательство с проблемами в коде сторонней библиотеки, которая была не очень
нужна для проекта.