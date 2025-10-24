'use client';

import {
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';

import { Dialog } from '@/components/ui/dialog';

interface ManualTriggerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ManualTriggerDialog = (props: ManualTriggerDialogProps) => {
  const { open, onOpenChange } = props;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border">
        <DialogHeader>
          <DialogTitle>Manual Trigger</DialogTitle>
          <DialogDescription>
            Configure settings for the manual trigger.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Used to manually trigger the workflow.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
