import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className="w-full flex justify-center">
      <div className={cn("w-[85%] lg:w-[60%]", className)}>
        {children}
      </div>
    </div>
  );
} 