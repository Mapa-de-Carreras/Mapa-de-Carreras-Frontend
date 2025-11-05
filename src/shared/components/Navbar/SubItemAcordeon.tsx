type SubItemProp = {
  subtitle: string;
};

const SubItemAcordeon = ({ subtitle }: SubItemProp) => {
  return (
    <div className="flex items-center text-sm rounded-sm hover:bg-accent gap-2">
      <span className="icon-[tabler--point-filled] size-3 text-white" />
      <span>{subtitle}</span>
    </div>
  );
};

export default SubItemAcordeon;