import Icon from "deco-sites/yamamay/components/ui/Icon.tsx";

function Newsletter() {
  return (
    <div class="flex flex-col gap-6  py-5">
      <div class="flex flex-col gap-2 max-w-[400px]">
        <span class="font-normal  text-2xl   lg:text-3xl text-center lg:text-start">
          Newsletter
        </span>
        <span class="text-xs text-center lg:text-start lg:text-sm">
          Sign up to be updated on the latest news and you'll immediately
          receive a 10% DISCOUNT on your next online purchase!
        </span>
      </div>
      <form class="flex flex-row max-w-[85%] mx-auto lg:mx-0 lg:max-w-none items-center gap-2 font-body text-body w-full sm:w-[408px] border-b border-solid border-black">
        <input
          class="py-2 flex-grow bg-transparent text-xs lg:text-body"
          placeholder="e-mail"
        />
        <button
          class="py-2 px-3 bg-transparent text-base-content rounded"
          type="button" // prevent form's default behavior
        >
          <Icon
            id="ChevronRight"
            width={20}
            height={20}
            strokeWidth={2}
          />
        </button>
      </form>
      <span class="text-xs text-center lg:text-start">
        By clicking "Subscribe" the user accepts Yamamay's{" "}
        <a href="/conditions-of-use" class="underline text-blue-500">
          Terms and conditions
        </a>{" "}
        and{" "}
        <a href="/privacy-cookie-policy" class="underline text-blue-500">
          Privacy information
        </a>
      </span>
    </div>
  );
}

export default Newsletter;
