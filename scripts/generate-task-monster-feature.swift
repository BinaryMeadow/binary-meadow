import AppKit
import CoreGraphics
import Foundation

let width = 1024
let height = 500
let scale = 2
let root = URL(fileURLWithPath: #filePath).deletingLastPathComponent().deletingLastPathComponent()
let output = root.appendingPathComponent("public/apps/task-monster-feature.jpg")

func colour(_ hex: Int, alpha: CGFloat = 1) -> NSColor {
    NSColor(
        calibratedRed: CGFloat((hex >> 16) & 0xff) / 255,
        green: CGFloat((hex >> 8) & 0xff) / 255,
        blue: CGFloat(hex & 0xff) / 255,
        alpha: alpha
    )
}

func rect(_ x: CGFloat, _ y: CGFloat, _ w: CGFloat, _ h: CGFloat) -> CGRect {
    CGRect(x: x, y: CGFloat(height) - y - h, width: w, height: h)
}

func rounded(_ x: CGFloat, _ y: CGFloat, _ w: CGFloat, _ h: CGFloat, radius: CGFloat, fill: NSColor) {
    fill.setFill()
    NSBezierPath(roundedRect: rect(x, y, w, h), xRadius: radius, yRadius: radius).fill()
}

func text(_ value: String, x: CGFloat, y: CGFloat, size: CGFloat, weight: NSFont.Weight, fill: NSColor) {
    let font = NSFont.systemFont(ofSize: size, weight: weight)
    let attributes: [NSAttributedString.Key: Any] = [.font: font, .foregroundColor: fill]
    let lineHeight = (value as NSString).size(withAttributes: attributes).height
    (value as NSString).draw(at: NSPoint(x: x, y: CGFloat(height) - y - lineHeight), withAttributes: attributes)
}

guard let bitmap = NSBitmapImageRep(
    bitmapDataPlanes: nil,
    pixelsWide: width * scale,
    pixelsHigh: height * scale,
    bitsPerSample: 8,
    samplesPerPixel: 4,
    hasAlpha: true,
    isPlanar: false,
    colorSpaceName: .deviceRGB,
    bytesPerRow: 0,
    bitsPerPixel: 0
), let graphics = NSGraphicsContext(bitmapImageRep: bitmap) else {
    fatalError("Could not create the feature graphic")
}

NSGraphicsContext.saveGraphicsState()
NSGraphicsContext.current = graphics
let context = graphics.cgContext
context.scaleBy(x: CGFloat(scale), y: CGFloat(scale))
context.setAllowsAntialiasing(true)

let gradient = CGGradient(
    colorsSpace: CGColorSpaceCreateDeviceRGB(),
    colors: [colour(0x30253d).cgColor, colour(0x493052).cgColor] as CFArray,
    locations: [0, 1]
)!
context.drawLinearGradient(
    gradient,
    start: CGPoint(x: 0, y: 500),
    end: CGPoint(x: 1024, y: 0),
    options: []
)

colour(0xff6199, alpha: 0.11).setFill()
NSBezierPath(ovalIn: rect(483, -230, 730, 730)).fill()
colour(0xffd5e5, alpha: 0.09).setFill()
NSBezierPath(ovalIn: rect(-185, 335, 360, 360)).fill()

rounded(56, 55, 258, 34, radius: 17, fill: colour(0xff6199, alpha: 0.18))
text("YOUR TASKS. THEIR TREAT.", x: 72, y: 64, size: 13, weight: .bold, fill: colour(0xffbbd1))

text("Task", x: 52, y: 116, size: 100, weight: .heavy, fill: colour(0xfff8f4))
text("Monster", x: 52, y: 211, size: 89, weight: .heavy, fill: colour(0xff75a5))
text("Finish tasks. Feed your monster.", x: 58, y: 333, size: 25, weight: .semibold, fill: colour(0xfff8f4))
text("Watch your progress come to life.", x: 58, y: 371, size: 21, weight: .regular, fill: colour(0xf1dce8))

rounded(58, 435, 144, 34, radius: 17, fill: colour(0xffffff, alpha: 0.11))
text("GET THINGS DONE", x: 72, y: 443, size: 12, weight: .bold, fill: colour(0xffffff))
rounded(212, 435, 150, 34, radius: 17, fill: colour(0xffffff, alpha: 0.11))
text("GROW TOGETHER", x: 228, y: 443, size: 12, weight: .bold, fill: colour(0xffffff))

func phone(_ filename: String, x: CGFloat, y: CGFloat, width: CGFloat) {
    let source = root.appendingPathComponent("public/screenshots/task-monster/\(filename)")
    guard let image = NSImage(contentsOf: source) else {
        fatalError("Missing Task Monster screenshot: \(source.path)")
    }
    let screenHeight = width * 3120 / 1440
    rounded(x - 6, y - 6, width + 12, screenHeight + 12, radius: 31, fill: colour(0x231b30, alpha: 0.28))
    rounded(x - 3, y - 3, width + 6, screenHeight + 6, radius: 28, fill: colour(0xffffff))
    let bounds = rect(x, y, width, screenHeight)
    context.saveGState()
    NSBezierPath(roundedRect: bounds, xRadius: 24, yRadius: 24).addClip()
    image.draw(in: bounds, from: .zero, operation: .copy, fraction: 1)
    context.restoreGState()
}

phone("1-tasks.jpg", x: 633, y: 135, width: 174)
phone("2-monster.jpg", x: 785, y: 50, width: 206)

NSGraphicsContext.restoreGraphicsState()
guard let data = bitmap.representation(using: .jpeg, properties: [.compressionFactor: 0.88]) else {
    fatalError("Could not encode the feature graphic")
}
try data.write(to: output)
print("Wrote \(output.path) (\(width * scale)x\(height * scale))")
