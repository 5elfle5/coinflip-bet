/* eslint-disable @typescript-eslint/no-explicit-any */
export function SelectSide(props: any) {
  return (
    <div className="flex">
      <div
        onClick={() => props.setIsHeads(false)}
        className={!props.isHeads ? 'bg-gray-900 size-16 border-2 border-solid' : 'bg-gray-900 size-16'}
      ></div>
      <div
        onClick={() => props.setIsHeads(true)}
        className={props.isHeads ? 'bg-red-600 size-16 border-2 border-solid' : 'bg-red-600 size-16'}
      ></div>
    </div>
  );
}