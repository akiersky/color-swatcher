import sketch from 'sketch'

const doc = sketch.getSelectedDocument()  
const page = doc.selectedPage
let artboard = doc.selectedPage;

export default function() {
	const selectedLayers = doc.selectedLayers
	const selectedCount = selectedLayers.length
 

	if (selectedCount == 0) {
		createStylesheet(doc);

  		sketch.UI.message("Swatch stylesheet generated 🙌")
	} 
	else {
		for (let i = 0; i < selectedCount; i++) {
			const fillcolor = doc.selectedLayers.layers[i].style.fills[0].color.slice(0, 7)
			const position = parentOffsetInArtboard(doc.selectedLayers.layers[i]);
			log(`position: ` + position.x + " : " + position.y)
			createSwatch(fillcolor, 0, artboard, position);
		}
  		sketch.UI.message("Swatch generated 🙌")
	}
}

function createStylesheet(doc) {
	const styles = doc.sharedLayerStyles;
	//log(styles)

	const group = new sketch.Group({
		parent:page,
		name: "Styles"
	})

	for (let s in styles) {
		if(styles.hasOwnProperty(s)){
			//log(styles[s].name)
			const stylecolor = styles[s].style.fills[0].color.slice(0, 7)
			createSwatch(stylecolor, s, group)
		}
	}
}

//find layer position relative to artboard
function parentOffsetInArtboard (layer) {
  let offset = {x: 0, y: 0};
  let parent = layer.parent;
  let layerOffset = {x: layer.frame.x + layer.frame.width, y: layer.frame.y};
  log('layerOffset' + layerOffset.x + ' : ' + layerOffset.y)
  while (parent.type !== 'Artboard') {
    offset.x += parent.frame.x;
    offset.y += parent.frame.y;
    parent = parent.parent;
  }
  artboard = parent;
  offset.x += layerOffset.x;
  offset.y += layerOffset.y;

  return offset;
}

function createSwatch(color, offset, artboard, parentRect) {
	let pos = (parentRect) ? {x: parentRect.x +10, y: parentRect.y} : {x: 110*offset, y:0};
	log(`pos: ` + pos.x + " : "+ pos.y);

	// group for the created swatch
	const swatch = new sketch.Group({
		parent:artboard,
		name: color + " swatch",
		frame: new sketch.Rectangle(pos.x, pos.y, 100, 100)
	})
	// rectangle background same color as the swatch
	const rectcolor = new sketch.Shape({
		parent: swatch,
		frame: new sketch.Rectangle(0, 0, 100, 40),
		style: {fills: [{ color: color }], borders: [{enabled:false}] }
	})
	// rectangle background same color as the swatch
	const rectwhite = new sketch.Shape({
		parent: swatch,
		frame: new sketch.Rectangle(0, 40, 100, 40),
		style: {fills: [{ color: '#ffffff' }], borders: [{enabled:false}] }
	})
	// rectangle background same color as the swatch
	const rectblack = new sketch.Shape({
		parent: swatch,
		frame: new sketch.Rectangle(0, 80, 100, 40),
		style: {fills: [{ color: '#000000' }], borders: [{enabled:false}] }
	})

	//text showing contrast against white
	const whitecontrast = contrast([255, 255, 255], hexToRgb(color)).toFixed(1)

	const whiteratio = new sketch.Text({
		parent: swatch,
		text: whitecontrast + ":1 " + checkWCAG(whitecontrast),
		frame: new sketch.Rectangle(8, 55, 92, 40),
		style: {fills: [{ color: '#000000' }], borders: [{enabled:false}] }
	})

	//text showing contrast against black
	const blackcontrast = contrast([0, 0, 0], hexToRgb(color)).toFixed(1)
	const blackratio = new sketch.Text({
		parent: swatch,
		text: blackcontrast + ":1 " + checkWCAG(blackcontrast),
		frame: new sketch.Rectangle(8, 95, 92, 40),
		style: {fills: [{ color: '#ffffff' }], borders: [{enabled:false}] }
	})

	const contrastColor = (whitecontrast / blackcontrast > 1) ? '#ffffff' : '#000000'
	// text showing the color of the swatch
	const textcolor = new sketch.Text({
		parent: swatch,
		text: color,
		fixedWidth: true,
		frame: new sketch.Rectangle(8, 15, 92, 40),
		style: {fills: [{ color: contrastColor }], borders: [{enabled:false}] }
	})

	// log(whitecontrast)
	// log(blackcontrast)
}
////////////////////////////////// HELPER FUNCTIONS/////////////////////////////////
// from: https://stackoverflow.com/questions/9733288/how-to-programmatically-calculate-the-contrast-ratio-between-two-colors
// calculate luminanace of a color
function luminanace(r, g, b) {
    let a = [r, g, b].map(function (v) {
        v /= 255
        return v <= 0.03928
            ? v / 12.92
            : Math.pow( (v + 0.055) / 1.055, 2.4 )
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}
//calculate contrast between two rgb colors
function contrast(rgb1, rgb2) { 
	let result = (luminanace(rgb1[0], rgb1[1], rgb1[2]) + 0.05) 
			   / (luminanace(rgb2[0], rgb2[1], rgb2[2]) + 0.05); 
	if (result < 1) result = 1/result; 
	return result; 
}

// WCAG 2 level AA requires a contrast ratio of at least 4.5:1 for normal text 
//and 3:1 for large text, and a contrast ratio of at least 3:1 for graphics 
//and user interface components (such as form input borders). 
//Level AAA requires a contrast ratio of at least 7:1 for normal text and 4.5:1 for large text.

//Large text is defined as 14 point (typically 18.66px) and bold or larger, 
//or 18 point (typically 24px) or larger.

function checkWCAG(ratio) {
	if (ratio >= 7) {
		return '✔︎'
	} else if (ratio >= 4.5) {
		return 'Large AAA'
	} else if (ratio >= 3) {
		return 'Large AA'
	} else {
		return '✘'
	}
}

// from: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
//convert from hex to rgb
function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null
}

