import ClearIcon from '@mui/icons-material/Clear';

import { Badge } from '@/components/ui/Badge';

import { useOutside } from '@/hooks/useOutside';

import styles from './SingleSelect.module.css';

export interface IOption {
  label: string;
  value: string;
}

interface ISingleSelect {
  data: IOption[];
  onChange: (value: string) => void;
  value: string;
  isColorSelect?: boolean;
}

export function SingleSelect({ data, onChange, value, isColorSelect }: ISingleSelect) {
  const { isShow, setIsShow, ref } = useOutside(false);
  const getValue = () => data.find(item => item.value === value)?.value;

  return (
    <div
      className={`${styles.singleSelectContainer} ${isColorSelect ? styles.wMax : ''}`}
      ref={ref}
    >
      <button
        onClick={e => {
          e.preventDefault();
          setIsShow(!isShow);
        }}
      >
        {getValue() ? (
          <Badge
            variant={value}
            className={styles.capitalize}
          >
            {getValue()}
          </Badge>
        ) : (
          <Badge>Click for select</Badge>
        )}
      </button>
      {value && (
        <button
          className={styles.clearButton}
          onClick={e => {
            e.preventDefault();
            onChange('');
          }}
        >
          <ClearIcon />
        </button>
      )}
      {isShow && (
        <div className={styles.optionsDropdown}>
          {data.map(item => (
            <button
              key={item.value}
              onClick={e => {
                e.preventDefault();
                onChange(item.value);
                setIsShow(false);
              }}
              className={`${styles.optionButton} ${styles.capitalize}`}
            >
              <Badge variant={item.value}>{item.label}</Badge>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
