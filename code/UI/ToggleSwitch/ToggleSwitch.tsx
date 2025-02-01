import { ReactElement } from 'react';

interface Props {
  isSwitchOn: boolean;
  handleToggle: () => void;
}

export default function Toggle({
  isSwitchOn,
  handleToggle,
}: Props): ReactElement {
  return (
    <div className="flex items-center">
      <label
        htmlFor="toggleSwitch"
        className="flex items-center cursor-pointer"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="toggleSwitch"
            className="hidden"
            checked={isSwitchOn}
            onChange={handleToggle}
          />
          <div className="w-10 h-6 border-[1px] border-brand-black rounded-full shadow-inner toggle__line bg-brand-grey-light"></div>
          <div
            className={`${
              isSwitchOn ? 'toggle__dot--on' : 'toggle__dot--off'
            } absolute w-[1.4em] h-[1.4em] bg-white border-[1px] border-brand-black top-[0.05em] 
                            rounded-full transition-transform transform ${isSwitchOn ? 'translate-x-[1.1em]' : '-translate-x-0'}`}
          ></div>
        </div>
        <div className="ml-1 mt-[-0.2em]">
          <span
            className={`${isSwitchOn ? 'text-green-500' : 'text-red-500'} text-3xl `}
          >
            {isSwitchOn ? '•' : '•'}
          </span>
        </div>
      </label>
    </div>
  );
}
