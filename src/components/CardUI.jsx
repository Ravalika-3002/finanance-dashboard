const CardUI = ({ gradient }) => {
  return (
    <div className={`${gradient} text-white p-4 rounded-2xl shadow-lg w-full h-[170px] flex flex-col justify-between`}>

      <div className="flex justify-between text-sm">
        <span>🔥 Bank</span>
        <span>Logo</span>
      </div>

      <div className="text-lg tracking-widest">
        4586 1223 4567 8910
      </div>

      <div className="flex justify-between text-sm">
        <div>
          <p className="text-xs opacity-70">Card Name</p>
          <p>UserName</p>
        </div>

        <div>
          <p className="text-xs opacity-70">Valid Till</p>
          <p>02/30</p>
        </div>
      </div>

    </div>
  );
};

export default CardUI;