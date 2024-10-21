const ExcelJS = require('exceljs');
const { Product,Order,Customer } = require('../../../server/models'); // 假设你的Product模型位于该路径
const path = require('path');

// 导出产品数据为Excel
const generateProductExcel = async (req, res) => {
  try {
    // 从数据库中获取产品数据
    const products = await Product.findAll();

    // 创建一个新的工作簿
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Products');

    // 添加表头
    worksheet.columns = [
      { header: 'Product ID', key: 'product_id', width: 10 },
      { header: 'Product Name', key: 'product_name', width: 30 },
      { header: 'Price', key: 'price', width: 10 },
      { header: 'Description', key: 'product_description', width: 40 },
      { header: 'Category ID', key: 'category_id', width: 10 },
      { header: 'Quantity', key: 'quantity', width: 10 },
      { header: 'Visibility', key: 'visibility', width: 10 },
    ];

    // 填充产品数据
    products.forEach(product => {
      worksheet.addRow({
        product_id: product.product_id,
        product_name: product.product_name,
        price: product.price,
        product_description: product.product_description,
        category_id: product.category_id,
        quantity: product.quantity,
        visibility: product.visibility ? 'Visible' : 'Hidden',
      });
    });

    // 设置响应头信息，指示浏览器下载文件
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=products.xlsx');

    // 将Excel文件通过流返回给客户端
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error generating Excel file:', error);
    res.status(500).send('Error generating Excel file');
  }
};

// 导出订单数据为Excel
const generateOrderExcel = async (req, res) => {
    try {
      const orders = await Order.findAll();
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Orders');
  
      worksheet.columns = [
        { header: 'Order ID', key: 'id', width: 10 },
        { header: 'Customer ID', key: 'customer_id', width: 15 },
        { header: 'Address ID', key: 'address_id', width: 15 },
        { header: 'Total', key: 'total', width: 10 },
        { header: 'Total Tax', key: 'total_tax', width: 10 },
        { header: 'Status', key: 'status', width: 15 },
        { header: 'Order Date', key: 'order_date', width: 20 },
        { header: 'Ship Date', key: 'ship_date', width: 20 },
        { header: 'Shipping Method', key: 'shipping_method', width: 20 },
        { header: 'Tracking Number', key: 'tracking_number', width: 20 },
        { header: 'Complete Date', key: 'complete_date', width: 20 },
      ];
  
      orders.forEach(order => {
        worksheet.addRow({
          id: order.id,
          customer_id: order.customer_id,
          address_id: order.address_id,
          total: order.total,
          total_tax: order.total_tax,
          status: order.status,
          order_date: order.order_date,
          ship_date: order.ship_date,
          shipping_method: order.shipping_method,
          tracking_number: order.tracking_number,
          complete_date: order.complete_date,
        });
      });
  
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=orders.xlsx');
  
      await workbook.xlsx.write(res);
      res.end();
    } catch (error) {
      console.error('Error generating Excel file:', error);
      res.status(500).send('Error generating Excel file');
    }
  };

  // 导出用户数据为Excel
const generateUserExcel = async (req, res) => {
    try {
      const customers = await Customer.findAll();
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Users');
  
      worksheet.columns = [
        { header: 'Customer ID', key: 'customer_id', width: 10 },
        { header: 'Customer Name', key: 'customer_name', width: 30 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Phone', key: 'phone', width: 15 },
        { header: 'Birthday', key: 'birthday', width: 15 },
        { header: 'Register Date', key: 'register_date', width: 20 },
      ];
  
      customers.forEach(customer => {
        worksheet.addRow({
          customer_id: customer.customer_id,
          customer_name: customer.customer_name,
          email: customer.email,
          phone: customer.phone,
          birthday: customer.birthday,
          register_date: customer.register_date,
        });
      });
  
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');
  
      await workbook.xlsx.write(res);
      res.end();
    } catch (error) {
      console.error('Error generating Excel file:', error);
      res.status(500).send('Error generating Excel file');
    }
  };
  

module.exports = {
    generateProductExcel,
    generateOrderExcel,
    generateUserExcel
  };
