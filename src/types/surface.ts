import type { SurfaceLabel } from "./product";

export interface Surface {
  id: string;
  title: string;
  label: SurfaceLabel;
  description: string;
  icon: string;
}
