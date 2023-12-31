# Mesto

## Обзор
Mesto - это фотохостинг, отображающий пользователю набор постов с фотографиями/изображениями их названиями и лайками.   
  
## Основной функционал
 - загрузка списка постов с сервера,
 - редактирование профиля пользователя (Имя, описание, аватар)
 - добавление/удаление нового поста с фотографией места (пользователь может удалять только свои посты),
 - просмотр изображения в оригинальном размере,
 - возможность отмечать посты лайком.  
  
## Какие возможности React.js использовались
- Приложение создавалось на основе CRA (Create React APP). Версия React - 18.2.0.  
- При портировании в react app использовались функциональные компоненты с хуками состояния и эффектов.  
- HTML разметка описывается посредством JSX (расширение javascript).  
- При создании компонентов применялся метод поднятия стейта. Стейт-переменные были вынесены в родительский компонент App. Значения и обработчики пробрасываются в компоненты через "пропсы".
- В формах использовались упраляемые компоненты (инпуты форм), в одной из форм неуправляемый компонент (элемент инпута был получен через useRef).
- Данные пользователя, полученные с сервера, хранятся в глобальном стейте и передаются компонентам через контекст.  

## Ссылки https://vyacheslavkuznetso.github.io/mesto-react/