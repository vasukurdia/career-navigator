import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckCircle2, Circle, Loader2, Lock } from "lucide-react";

import { cn } from "@/lib/utils";

const learnerProgressBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      status: {
        default: "border-transparent bg-muted text-muted-foreground",
        inProgress: "border-transparent bg-secondary text-secondary-foreground",
        completed: "border-transparent bg-accent text-accent-foreground",
        disabled: "border-transparent bg-muted/50 text-muted-foreground/50 cursor-not-allowed",
      },
    },
    defaultVariants: {
      status: "default",
    },
  },
);

export interface LearnerProgressBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof learnerProgressBadgeVariants> {
  label?: string;
}

const statusIcon: Record<string, React.ReactNode> = {
  default: <Circle className="h-3 w-3" />,
  inProgress: <Loader2 className="h-3 w-3 animate-spin" />,
  completed: <CheckCircle2 className="h-3 w-3" />,
  disabled: <Lock className="h-3 w-3" />,
};

const statusDefaultLabel: Record<string, string> = {
  default: "Draft",
  inProgress: "Processing",
  completed: "Completed",
  disabled: "Disabled",
};

function LearnerProgressBadge({ className, status = "default", label, ...props }: LearnerProgressBadgeProps) {
  const key = status ?? "default";
  return (
    <div className={cn(learnerProgressBadgeVariants({ status }), className)} {...props}>
      {statusIcon[key]}
      <span>{label ?? statusDefaultLabel[key]}</span>
    </div>
  );
}

export { LearnerProgressBadge, learnerProgressBadgeVariants };