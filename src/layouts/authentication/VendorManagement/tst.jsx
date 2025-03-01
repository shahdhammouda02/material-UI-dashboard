<DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                bgColor="info"
                borderRadius="lg"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h5" color="white">
                  إدارة البائعين
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={3}>
                {vendors.length === 0 ? (
                  <MDTypography variant="body1" textAlign="center" p={3}>
                    لا يوجد بائعين متاحين.
                  </MDTypography>
                ) : (
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid" }}>
                        <th>الاسم</th>
                        <th>البريد الإلكتروني</th>
                        <th>رقم الهاتف</th>
                        <th>الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vendors.map((vendor) => (
                        <tr key={vendor.id} style={{ borderBottom: "1px solid" }}>
                          <td>
                            {editingId === vendor.id ? (
                              <TextField
                                value={tempData.name}
                                onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
                              />
                            ) : (
                              vendor.name
                            )}
                          </td>
                          <td>{vendor.email}</td>
                          <td>{vendor.phone}</td>
                          <td>
                            {editingId === vendor.id ? (
                              <>
                                <MDButton onClick={handleSave} color="success">
                                  <SaveIcon /> حفظ
                                </MDButton>
                                <MDButton onClick={handleCancel} color="error">
                                  <CancelIcon /> إلغاء
                                </MDButton>
                              </>
                            ) : (
                              <>
                                <MDButton onClick={() => handleEdit(vendor)} color="info">
                                  <EditIcon /> تعديل
                                </MDButton>
                                <MDButton onClick={() => handleDelete(vendor.id)} color="error">
                                  <DeleteIcon /> حذف
                                </MDButton>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>