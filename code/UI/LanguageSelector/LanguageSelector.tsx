'use client';

import { Language } from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';
import { Text } from 'rds-ui-system';

import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { useClientTranslation } from '../../../app/i18n/client';
import { languages } from '../../../app/i18n/settings';

interface Props {
  lng: string;
}

export const LanguageSelector: React.FC<Props> = ({ lng }) => {
  const { t, i18n } = useClientTranslation(lng, 'meta');
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const router = useRouter();
  const pathName = usePathname();

  const handleWindowClick: EventListener = useCallback(
    (event) => {
      if (!dropdownOpen) {
        return;
      }
      let target: HTMLElement | null = event.target as HTMLElement;
      while (target !== null && target.id !== 'language-selector') {
        target = target.parentElement;
      }
      if (target !== null) {
        return;
      }
      setDropdownOpen(false);
    },
    [dropdownOpen],
  );

  useEffect(() => {
    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [handleWindowClick]);

  const handleLanguageSelected = useCallback(
    (e: MouseEvent<HTMLButtonElement>, lang: string) => {
      e.preventDefault();
      e.stopPropagation();
      setDropdownOpen(false);
      if (lang !== i18n.language) {
        const path = pathName.split('/').toSpliced(1, 1, lang).join('/');
        router.push(path);
      }
    },
    [i18n, pathName, router],
  );

  const availableLng = languages.map((key) => [key, t(`lngs.${key}`)]);

  return (
    <div
      id="language-selector"
      className="flex flex-row relative focus cursor-pointer"
      onClick={() => {
        setDropdownOpen(true);
      }}
    >
      <Language />
      <Text customClasses="pl-2">{i18n.language.toUpperCase()}</Text>
      {dropdownOpen && (
        <div className="absolute right-0 top-[1.5rem] text-black bg-white min-w-32 border border-solid border-black rounded">
          {availableLng.map(([lang, language]) => {
            return (
              <button
                key={lang}
                onClick={(e) => {
                  handleLanguageSelected(e, lang);
                }}
                className={`w-full ${lang === i18n.language ? 'bg-gray-200' : 'bg-white'} py-2 border-b border-solid border-gray-400 hover:bg-blue-50 transition-colors`}
              >
                {language}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
