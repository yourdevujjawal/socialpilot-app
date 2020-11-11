function checkPost() {
  if ($(window).width() > 1279) {
    $(document).click(function (e) {
      if (
        $(e.target).hasClass("post") ||
        $(e.target).closest(".post").hasClass("post")
      ) {
        console.log("inside");
        $(e.target)
          .closest(".post")
          .find("[id*='post-option-trigger']")
          .trigger("show.bs.dropdown");
      } else {
        console.log("outside");

        $(document)
          .find(".post-wrapper")
          .each(function () {
            if ($(this).find('[id*="postcheck_"]').is(":checked")) {
              //nothing
            } else {
              $(this)
                .find("[id*='post-option-trigger']")
                .trigger("hide.bs.dropdown");
            }
          });
      }
    });
  }
}

$(document).ready(checkPost());

$("[id*='post-option-trigger']").on("show.bs.dropdown", function () {
  $(this).closest(".post-wrapper").addClass("active");
});

$("[id*='post-option-trigger']").on("hide.bs.dropdown", function () {
  $(this).closest(".post-wrapper").removeClass("active");
});

$('[id*="postcheck_"]').change(function () {
  if ($(this).is(":checked")) {
    $(this).closest(".post-wrapper").addClass("active");
    $(".selectedpost-topbar-controls").addClass("active");
  } else {
    $(this).closest(".post-wrapper").removeClass("active");
    $(".selectedpost-topbar-controls").removeClass("active");
  }
});

$("[id*='postgroupcheckbox-']").change(function () {
  var innerPosts = $(this).closest(".post-group").find(".post-wrapper");
  if ($(this).is(":checked")) {
    $(innerPosts).each(function () {
      $(this).find('[id*="postcheck_"]').prop("checked", true);
      $(this).find('[id*="postcheck_"]').trigger("change");
    });
  } else {
    $(innerPosts).each(function () {
      $(this).find('[id*="postcheck_"]').prop("checked", false);
      $(this).find('[id*="postcheck_"]').trigger("change");
    });
  }
});

$("#selectAllPosts").change(function () {
  var postGroups = $(this).closest(".app").find($(".post-group"));
  if ($(this).is(":checked")) {
    $(postGroups).each(function () {
      $(this).find('[id*="postgroupcheckbox-"]').prop("checked", true);
      $(this).find('[id*="postgroupcheckbox-"]').trigger("change");
    });
  } else {
    $(postGroups).each(function () {
      $(this).find('[id*="postgroupcheckbox-"]').prop("checked", false);
      $(this).find('[id*="postgroupcheckbox-"]').trigger("change");
    });
  }
});

// sidebar dropdown position code

$(".navbar .dropright").on("mouseover", function () {
  var $menuItem = $(this),
    $submenuWrapper = $("> .dropdown-menu", $menuItem);

  // grab the menu item's position relative to its positioned parent
  var menuItemPos = $menuItem.position();

  // place the submenu in the correct position relevant to the menu item
  $submenuWrapper.css({
    top: menuItemPos.top + 20,
    left: menuItemPos.left + Math.round($(".navbar").outerWidth() * 0.8),
  });
});
