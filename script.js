const { screen, mouse, straightTo, Point, Button } = require('@nut-tree-fork/nut-js')

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

async function foundButton() {
    console.log('Searching for the button by color')

    const searchArea = {startX: 839, startY: 352, endX: 1700, endY: 643}
    const targetColor = { R: 53, G: 85, B: 72 }
    const tolerance = 20

    let button = false

    while (!button) {
        try {
            for (let x = searchArea.startX; x < searchArea.endX; x += 80) {
                for (let y = searchArea.startY; y < searchArea.endY; y += 80) {
                    const color = await screen.colorAt(new Point(x, y))

                    if (Math.abs(color.R - targetColor.R) <= tolerance &&
                        Math.abs(color.G - targetColor.G) <= tolerance &&
                        Math.abs(color.B - targetColor.B) <= tolerance) {

                        await mouse.move(straightTo(new Point(x, y)))
                        await mouse.click(Button.LEFT)
                        console.log('clicked')
                        button = true
                        break
                    }
                }
                if (button) break
            }
        } catch (e) {
            console.error(e)
        }

        if (!button) {
            console.log('sleep')
            await sleep(1000)
        }
    }
}

foundButton()

