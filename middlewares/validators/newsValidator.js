 const newUpdate = await News.findOne({ where: { title: idParams } });

 export default newUpdate;