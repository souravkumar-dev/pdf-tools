import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { formatFileSize } from "../../utils/formatFileSize";

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
      className="flex items-center justify-between border rounded-lg p-4 bg-white shadow-sm"
    >
      <div className="flex items-center gap-4">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-2xl select-none"
          title="Drag to reorder"
        >
          ☰
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

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(item.id);
        }}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Remove
      </button>
    </div>
  );
}

export default SortableFileCard;
