import { Users, GraduationCap, Calendar } from "lucide-react";

export function Experience() {
  return (
    <div className="p-0">
      <div className="grid">
        <div className="flex items-center gap-3 px-5 py-3 hover:bg-muted/50 transition-colors border-b border-border">
          <div className="p-2 rounded-md bg-muted/50">
            <Users className="size-4 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">Founder, Social Media Organizer / Editor</p>
            <p className="text-sm text-muted-foreground">The Scape Network • 2023 - Present</p>
            <p className="text-xs text-muted-foreground mt-1">
              A social media organization that brings you some photos, videos, graphics, and <br /> projects on various platforms. Some of them might be too minimalistic.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 px-5 py-3 hover:bg-muted/50 transition-colors border-b border-border">
          <div className="p-2 rounded-md bg-muted/50">
            <GraduationCap className="size-4 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">Part-time IT Instructor</p>
            <p className="text-sm text-muted-foreground">Braintrust Computer Systems, Inc. • 2023 - Present</p>
            <p className="text-xs text-muted-foreground mt-1">
              Teaching computer fundamentals, graphical concepts, and IT skills to students. Developing curriculum and providing hands-on technical training.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 px-5 py-3 hover:bg-muted/50 transition-colors border-border">
          <div className="p-2 rounded-md bg-muted/50">
            <Calendar className="size-4 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">Productions Committee</p>
            <p className="text-sm text-muted-foreground">HCDC College of Technology Students Organization • 2023 - 2024</p>
            <p className="text-xs text-muted-foreground mt-1">
              Collaborated on organizing student events, managing production logistics, and coordinating multimedia content for college activities and programs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
