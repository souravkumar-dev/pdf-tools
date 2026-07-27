import { GripVertical, Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { formatFileSize } from "../../utils/formatFileSize";
import Button from "../common/Button";

function SortableFileCard({ item, index, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={(e) => e.stopPropagation()}
      className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-blue-300"
    >
      <div className="flex items-center gap-4">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-gray-700"
          title="Drag to reorder"
        >
          <GripVertical size={22} />
        </div>

        <div>
          <p className="font-medium">
            {index + 1}. {item.file.name}
          </p>

          <p className="text-sm text-gray-500">
            {formatFileSize(item.file.size)}
          </p>
        </div>
      </div>

      <Button
        variant="danger"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(item.id);
        }}
      >
        <Trash2 size={18} />
      </Button>
    </div>
  );
}

export default SortableFileCard;
