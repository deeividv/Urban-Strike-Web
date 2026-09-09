import type { CSSProperties } from "react";
import type { SpriteSheet } from "@/app/lib/data";

type SpriteProps = {
  sheet: SpriteSheet;
  label: string;
  scale?: number;
  flip?: boolean;
  className?: string;
};

/**
 * Renderiza una hoja de sprites del juego y la anima con `steps()`.
 * Las hojas son tiras horizontales; algunas (las del SWAT) tienen el
 * personaje en la banda inferior, de ahí `offsetY`.
 */
export function Sprite({ sheet, label, scale = 1, flip = false, className = "" }: SpriteProps) {
  const sheetWidth = sheet.frames * sheet.frameW * scale;

  const style = {
    width: `${sheet.frameW * scale}px`,
    height: `${sheet.frameH * scale}px`,
    backgroundImage: `url(${sheet.src})`,
    backgroundSize: `${sheetWidth}px auto`,
    backgroundPositionY: `${-(sheet.offsetY ?? 0) * scale}px`,
    "--sprite-frames": sheet.frames,
    "--sprite-sheet-w": `${sheetWidth}px`,
    "--sprite-duration": `${(sheet.frames / sheet.fps).toFixed(2)}s`,
  } as CSSProperties;

  return (
    <div
      role="img"
      aria-label={label}
      className={`sprite ${flip ? "sprite-flip" : ""} ${className}`}
      style={style}
    />
  );
}
