import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Modal from "deco-sites/fashion/components/ui/Modal.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import { useSignal } from "@preact/signals";

function QuickView() {
  const open = useSignal(false);
  return (
    <>
      <Button
        aria-label="Quick buy"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();

          open.value = true;
        }}
        class="group/quickview btn-ghost"
      >
        <Icon
          id="ShoppingCart"
          width={24}
          height={24}
        />
        <span class="absolute underline font-normal opacity-0 normal-case text-[13px] bg-white transition-all px-1 py-[2px] group-hover/quickview:opacity-100 group-hover/quickview:translate-x-full whitespace-nowrap">
          Quick buy
        </span>
      </Button>
      <Modal
        open={open.value}
        onClose={(e) => {
          e.stopPropagation();
          e.preventDefault();

          open.value = false;
        }}
        mode="center"
      >
        QuickView
      </Modal>
    </>
  );
}

export default QuickView;
