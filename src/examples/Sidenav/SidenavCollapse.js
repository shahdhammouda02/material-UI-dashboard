import React, { useState } from "react";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";
import Collapse from "@mui/material/Collapse";

// مكونات مخصصة
import MDBox from "components/MDBox";

// الأنماط المخصصة لـ SidenavCollapse
import {
  collapseItem,
  collapseIconBox,
  collapseIcon,
  collapseText,
} from "examples/Sidenav/styles/sidenavCollapse";

function SidenavCollapse({ icon, name, active, collapse, onClick, noCollapse, ...rest }) {
  const [openCollapse, setOpenCollapse] = useState(false); // حالة التحكم في الفتح والإغلاق

  const handleToggle = () => {
    if (!noCollapse) {
      // إذا كان noCollapse غير موجود، قم بتبديل حالة الفتح والإغلاق
      setOpenCollapse((prevState) => !prevState);
    }
    if (onClick) onClick(); // إذا كان هناك دالة onClick ممررة من الأب، ننفذها
  };

  return (
    <ListItem component="li" onClick={handleToggle} sx={{ cursor: "pointer" }}>
      <MDBox
        {...rest}
        sx={(theme) =>
          collapseItem(theme, {
            active,
          })
        }
      >
        <ListItemIcon sx={(theme) => collapseIconBox(theme, { active })}>
          {typeof icon === "string" ? (
            <Icon sx={(theme) => collapseIcon(theme, { active })}>{icon}</Icon>
          ) : (
            icon
          )}
        </ListItemIcon>

        <ListItemText primary={name} sx={(theme) => collapseText(theme, { active })} />
      </MDBox>

      {collapse &&
        !noCollapse && ( // تأكد من أن collapse موجود فقط إذا لم يكن noCollapse
          <Collapse in={openCollapse} timeout="auto" unmountOnExit>
            <List sx={{ pl: 4 }}>
              {collapse.map((subItem) => (
                <SidenavCollapse
                  key={subItem.key}
                  name={subItem.name}
                  icon={subItem.icon}
                  active={subItem.key === active}
                  collapse={subItem.collapse}
                  onClick={onClick}
                  noCollapse={noCollapse} // تمرير noCollapse إلى العناصر الفرعية
                />
              ))}
            </List>
          </Collapse>
        )}
    </ListItem>
  );
}

// القيم الافتراضية للـ Props
SidenavCollapse.defaultProps = {
  active: false,
  collapse: null,
  onClick: () => {},
  noCollapse: false, // التأكد من تعيين القيمة الافتراضية
};

// التحقق من أنواع البيانات الخاصة بـ Props
SidenavCollapse.propTypes = {
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
  collapse: PropTypes.array,
  onClick: PropTypes.func,
  noCollapse: PropTypes.bool, // تحديد نوع البيانات للخاصية noCollapse
};

export default SidenavCollapse;
