import Button from "../ui/Button.tsx";
import Icon from "./Icon.tsx";

interface Props {
  quantity: number;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (quantity: number) => void;
}

const QUANTITY_MAX_VALUE = 100;

// Remove default browser behavior: https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp
// TODO: Figure out how to add it via tailwind config.
const innerStyle = `
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
`;

function QuantitySelector({ onChange, quantity, disabled, loading }: Props) {
  const decrement = () => onChange?.(Math.max(0, quantity - 1));

  const increment = () =>
    onChange?.(Math.min(quantity + 1, QUANTITY_MAX_VALUE));

  return (
    <div class="form-control">
      <div class="input-group">
        <Button
          class="bg-transparent h-[32px] min-h-[32px] w-[32px] border-transparent px-0 text-black hover:bg-transparent hover:border-transparent"
          onClick={decrement}
          disabled={disabled}
          loading={loading}
        >
          <Icon id="Minus" width={20} height={20} strokeWidth={1} />
        </Button>
        <input
          class="input border-base-content text-center h-[32px] w-[32px] text-black p-0"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          max={QUANTITY_MAX_VALUE}
          min={1}
          value={quantity}
          disabled={disabled}
          onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
        />
        <Button
          class="bg-transparent h-[32px] min-h-[32px] w-[32px] border-transparent px-0 text-black hover:bg-transparent hover:border-transparent"
          onClick={increment}
          disabled={disabled}
          loading={loading}
        >
          <Icon id="Plus" width={20} height={20} strokeWidth={1} />
        </Button>
      </div>
    </div>
  );
}

export default QuantitySelector;
