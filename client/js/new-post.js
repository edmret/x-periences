Template.new_post.helpers({
  categoryList: function() {
    return Categories.find({}, {sort: {name:1}});
  }
});
