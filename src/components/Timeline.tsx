"use client";

export const Timeline = () => {
  return (
    <div className="rounded-lg border bg-background text-foreground">
      <div className="relative px-4">
        {/* Text container */}
        <div className="relative pt-8">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-[11px]">
              <p className="font-medium">DRANHS</p>
              <p className="text-[10px] text-muted-foreground mt-1">Tertiary</p>
            </div>
            <div className="text-[11px]">
              <p className="font-medium">DCDNHS</p>
              <p className="text-[10px] text-muted-foreground mt-1">Senior High</p>
            </div>
            <div className="text-[11px]">
              <p className="font-medium">BS Information Technology</p>
              <p className="text-[10px] text-muted-foreground mt-1">College</p>
            </div>
          </div>
        </div>

        {/* Timeline bars */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="relative h-2.5">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-purple-400 bg-[length:200%_200%] animate-gradient"></div>
          </div>
          <div className="relative h-2.5">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-400 bg-[length:200%_200%] animate-gradient"></div>
          </div>
          <div className="relative h-2.5">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400 via-red-500 to-pink-500 bg-[length:200%_200%] animate-gradient"></div>
          </div>
        </div>

        {/* Years */}
        <div className="grid grid-cols-4 gap-4 mt-2 pb-4">
          <div className="text-[10px] text-muted-foreground">2018 - 2021</div>
          <div className="text-[10px] text-muted-foreground">2021 - 2023</div>
          <div className="text-[10px] text-muted-foreground">2023 - Present</div>
        </div>
      </div>
    </div>
  );
}; 