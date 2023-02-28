import { marked } from 'marked'

export const proseExample = marked(`
# An h1 header

This is a paragraph. Paragraphs can have any length, and when long enough, their content wraps over
multiple lines. This paragraph, for instance, should be long enough to do so in the most common
screen sizes that are comfortable to read anyway.

A second paragraph now. One that contains [a link to Doist.com](https://doist.com), and text
formatting examples, such as **bold text**, _italic text_, and \`monospace\`. Now let’s continue
with a list:

-   this one
-   that one
-   the other one

And a blockquote:

> Blockquotes are indented and have a border on the left. The text color is slightly dimmed.
>
> They can span multiple paragraphs, if you like.
>
> > And they can be nested too.

## An h2 header

Here's a numbered list:

1.  first item
2.  second item
3.  third item

Here's a multi-line code example:

    # Let me re-iterate ...
    for i in 1 .. 10 { do-something(i) }

And another one

\`\`\`python
import time
# Quick, count to ten!
for i in range(10):
    # (but not *too* quick)
    time.sleep(0.5)
    print i
\`\`\`

### An h3 header

Now a nested list:

1.  First, get these ingredients:

    -   carrots
    -   celery
    -   lentils

2.  Boil some water.

3.  Dump everything in the pot and follow
    this algorithm:

        find wooden spoon
        uncover pot
        stir
        cover pot
        balance wooden spoon precariously on pot handle
        wait 10 minutes
        goto first step (or shut off burner when done)

    Do not bump wooden spoon or it will fall.

---

A horizontal rule follows.

---

The End
`)
