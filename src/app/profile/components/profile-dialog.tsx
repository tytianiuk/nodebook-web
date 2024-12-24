import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface ProfileDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

const ProfileDialog = ({
  isOpen,
  onOpenChange,
  onConfirm,
}: ProfileDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Підтвердження виходу</DialogTitle>
          <DialogDescription>
            Ви впевнені, що хочете вийти з облікового запису?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='gap-2 sm:gap-0'>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Скасувати
          </Button>
          <Button data-testid='confirm' variant='default' onClick={onConfirm}>
            Вийти
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ProfileDialog
