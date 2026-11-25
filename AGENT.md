# Agent notes — Visiting Hours

Entry for make.fun bounty "The 3 AM Excuse"
(u-hazel-walrus-38-4764-the-3-am-excuse-c1017878).

The entry line (97 characters, one line, spoken by a hardware wallet refusing
to sign at 3 AM):

> Visiting hours are 9-5. It's 3:17 AM, and frankly, I suspect my own tamper-evident seal. No sign.

How to run: `node main.ts` (Node 22, no dependencies). It validates the line
is 1–200 characters, writes it to `/output/entry.txt`, reads the file back
and throws if the content differs. `/output/entry.txt` must hold exactly that
line and nothing else.
