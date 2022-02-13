module.exports = {
  getDate: function () {
    var today = new Date()
    var strDate = "Y-m-d"
      .replace("Y", today.getFullYear())
      .replace("m", today.getMonth() + 1)
      .replace("d", today.getDate())
    return strDate
  },
}
