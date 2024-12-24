import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface AuthDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onClose: () => void
}

const AuthDialog: React.FC<AuthDialogProps> = ({
  isOpen,
  onOpenChange,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Увійдіть або створіть обліковий запис</DialogTitle>
          <DialogDescription>
            Для відправки повідомлення необхідно увійти або створити обліковий
            запис.
          </DialogDescription>
        </DialogHeader>
        <div className='flex justify-end space-x-4 mt-4'>
          <Button variant='outline' onClick={onClose}>
            Увійти
          </Button>
          <Button onClick={onClose}>Створити обліковий запис</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AuthDialog
