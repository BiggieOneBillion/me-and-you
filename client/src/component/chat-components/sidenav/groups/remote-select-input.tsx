import React, { useState, useEffect } from "react";
import Select, { MultiValue } from "react-select";
import { api } from "../../../../utils/api-settings";
import { userProp, userStore } from "../../../../store/global-store";

interface Option {
  value: string;
  label: string;
}

type Props = {
  handleFormUpdate: (value: string[]) => void;
};

const RemoteSelect: React.FC<Props> = ({ handleFormUpdate }) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const token = userStore((state: unknown) => (state as userProp).token);

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data.map((item: any) => ({
        value: item._id,
        label: item.username,
      }));
      setOptions(data);
    } catch (error) {
      console.error("Error fetching options:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (newValue: MultiValue<Option>) => {
    // // console.log(newValue);
    const update = newValue.map((option) => option.value);
    handleFormUpdate(update);
    setSelectedOptions(newValue as Option[]);
  };

  return (
    <div>
      <Select
        isMulti
        isLoading={isLoading}
        options={options}
        value={selectedOptions}
        onChange={handleChange}
      />
      {/* <div>
        Selected options:{" "}
        {JSON.stringify(selectedOptions.map((option) => option.value))}
      </div> */}
    </div>
  );
};

export default RemoteSelect;
