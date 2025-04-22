import { ContentLayout } from "../../../components";
import { Outlet, useNavigate } from "react-router-dom";
import ItemObatDetailTabs from "./itemObatDetailTabs";

const ItemObatDetail = () => {
  const navigate = useNavigate();
  return (
    <ContentLayout
      title="Paracetamol 500mg"
      onBack={() => navigate("/master-item/item-obat")}
    >
      <div>
        <ItemObatDetailTabs />
      </div>
      <Outlet />
    </ContentLayout>
  );
};

export default ItemObatDetail;
