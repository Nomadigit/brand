# Voice

**Clear, friendly, short, practical.** Write the way a capable friend explains things: say what happens, then stop.

## Principles

1. One idea per sentence. Lead with the result.
2. Russian products and bots address the reader as **«ты»**. The CV, formal letters and documents use **«вы»**.
3. Name things the way users do, not the way the code does: "напоминание", not "задача планировщика".
4. Errors say what went wrong and what to do next. No apologies, no blame.
5. Avoid: hype ("революционный", "AI-powered"), jargon, exclamation marks, emoji in system text,
   «извините за неудобства».

## Examples

| Context | Do | Don't |
|---|---|---|
| Bot confirms | Готово. Напомню завтра в 10:00. | Ваше напоминание было успешно создано! 🎉 |
| Input error | Не понял время. Попробуй «завтра в 10» или «через 30 минут». | Произошла ошибка. Извините за неудобства. |
| Empty state | Напоминаний пока нет. Напиши, например: «завтра в 9 позвонить врачу». | Здесь ничего нет :( |
| Button | Отложить на 15 минут | Нажмите сюда, чтобы отложить |
| Project blurb (en) | Telegram bot that reminds you on time, in your time zone. | A revolutionary AI-powered productivity solution. |
| CV line (en) | Built a bilingual Telegram bot with time-zone-aware recurring reminders (Go, PostgreSQL). | Passionate rockstar developer who loves challenges. |

## Formatting

- Sentence case for titles and buttons ("Новое напоминание", not "Новое Напоминание").
- Dates: `04.10.2026` in Russian copy and `Oct 4, 2026` in English. Times use 24h (`15:30`).
- Numbers go in Mono only inside data and code, never in running text.
