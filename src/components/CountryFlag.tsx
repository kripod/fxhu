export interface CountryFlagProps {
  code: string;
  intrinsicSize?: number;
}

export function CountryFlag({ code, intrinsicSize = 16 }: CountryFlagProps) {
  return (
    <img
      src={`https://api.iconify.design/circle-flags/${code.slice(0, 2).toLowerCase()}.svg`}
      alt=""
      width={intrinsicSize}
      height={intrinsicSize}
      className="rounded-full outline -outline-offset-1 outline-black/10"
    />
  );
}
