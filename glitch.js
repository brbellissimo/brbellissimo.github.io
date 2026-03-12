const API_URL = "reasons.json"
const SUBTEXT = "YoRHa"

const SHOW_INTERVAL = 10000
const GLITCH_DURATION = 2000

let reasons = []
let TEXT = ""

const canvas = document.getElementById("glitchCanvas")
const ctx = canvas.getContext("2d")

const src = document.createElement("canvas")
const sctx = src.getContext("2d")

const buf = document.createElement("canvas")
const bctx = buf.getContext("2d")

const dpr = Math.max(1, window.devicePixelRatio || 1)

const TEXT_COLOR = "#111111"
const SHADOW_COLOR = "rgba(17, 17, 17, 0.18)"
const FONT_FAMILY = "'Fira Mono', monospace"
const FONT_MAIN_SIZE = 120
const FONT_SUB_SIZE = 42

const BASE_PIXEL = 10

let glitchStart = 0

function resize() {
	const w = window.innerWidth * dpr
	const h = window.innerHeight * dpr

	canvas.width = src.width = buf.width = w
	canvas.height = src.height = buf.height = h
}

window.addEventListener("resize", resize)
resize()

async function loadReasons() {
		reasons = ["GLORY TO MANKIND"]

}

function randomReason() {
	return reasons[Math.floor(Math.random() * reasons.length)]
}

function font(size, weight) {
	return `${weight} ${Math.round(size * dpr)}px ${FONT_FAMILY}`
}

function drawSource() {
	const w = src.width
	const h = src.height

	sctx.clearRect(0, 0, w, h)

	sctx.fillStyle = TEXT_COLOR
	sctx.textAlign = "center"
	sctx.textBaseline = "middle"
	sctx.shadowColor = SHADOW_COLOR
	sctx.shadowBlur = 12 * dpr

	sctx.font = font(FONT_MAIN_SIZE, 700)
	sctx.fillText(TEXT, w / 2, h * 0.45)

	sctx.font = font(FONT_SUB_SIZE, 600)
	sctx.fillText(SUBTEXT, w / 2, h * 0.60)
	sctx.shadowBlur = 0
}

function drawPixelated(pixel) {

	const w = canvas.width
	const h = canvas.height

	ctx.clearRect(0,0,w,h)

	const img = sctx.getImageData(0, 0, w, h).data

	for (let y = 0; y < h; y += pixel) {
		for (let x = 0; x < w; x += pixel) {

			const i = (y * w + x) * 4
			const a = img[i + 3]

			if (a < 10) continue

			ctx.fillStyle = `rgb(${img[i]},${img[i+1]},${img[i+2]})`
			ctx.fillRect(x, y, pixel, pixel)
		}
	}
}

function applyGlitch() {

	const w = canvas.width
	const h = canvas.height

	bctx.drawImage(canvas, 0, 0)

	const slices = 3 + Math.random() * 10

	for (let i = 0; i < slices; i++) {

		const y = Math.random() * h
		const height = 10 + Math.random() * 50
		const shift = (Math.random() * 2 - 1) * 60

		ctx.drawImage(buf, 0, y, w, height, shift, y, w, height)
	}
}

function glitchFrame() {

	const now = performance.now()
	const elapsed = now - glitchStart

	if (elapsed > GLITCH_DURATION) {
		canvas.style.display = "none"
		return
	}

	drawSource()

	const pixel = Math.max(2 * dpr, BASE_PIXEL * (1.4 - elapsed / GLITCH_DURATION))

	drawPixelated(pixel)

	if (Math.random() < 0.2) {
		applyGlitch()
	}

	requestAnimationFrame(glitchFrame)
}

function startGlitch() {

	if (!reasons.length) return

	TEXT = randomReason()

	glitchStart = performance.now()

	canvas.style.display = "block"

	requestAnimationFrame(glitchFrame)
}

function scheduleLoop() {

	setInterval(() => {
		startGlitch()
	}, SHOW_INTERVAL)
}

async function init() {

	await loadReasons()

	scheduleLoop()
}

init()
