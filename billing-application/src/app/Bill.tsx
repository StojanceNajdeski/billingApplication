import { faSquareXmark } from "@fortawesome/free-solid-svg-icons/faSquareXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Bill: React.FC<BillProps> = ({
  billItems,
  item,
  onDelete,
}: BillProps) => {
  return (
    <div className="flex-1 bg-white p-6 rounded shadow max-h-[80vh] overflow-auto">
      <h2 className="text-xl font-semibold mb-4">Сметка</h2>
      {billItems.length === 0 ? (
        <p>Нема додадени производи</p>
      ) : (
        <ul className="space-y-2">
          {billItems.map((item, idx) => (
            <li key={idx} className="flex justify-between border-b pb-1">
              <div>
                <span>{item.productName}</span>
              </div>
              <div className="items-center">
                <span className="font-bold">{item.price} ден</span>
                <FontAwesomeIcon
                  icon={faSquareXmark}
                  style={{ color: "#fe3434" }}
                  className="ml-4"
                  onClick={() => onDelete(item)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Bill;
