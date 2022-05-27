import $ = require('jquery');

export default async function scrollTop() {
  $("body").append(`
    <div class="scrollToTop">
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path id="first"
          d="M46.7646 53.7459C48.6308 52.1621 51.3692 52.1621 53.2354 53.7459L82.9182 78.9379C86.4667 81.9494 84.337 87.75 79.6829 87.75H20.3171C15.663 87.75 13.5333 81.9494 17.0818 78.9379L46.7646 53.7459Z"
        />
        <path id="second"
          d="M46.7646 27.7459C48.6308 26.1621 51.3692 26.1621 53.2354 27.7459L82.9182 52.9379C86.4667 55.9494 84.337 61.75 79.6829 61.75H20.3171C15.663 61.75 13.5333 55.9494 17.0818 52.9379L46.7646 27.7459Z"
        />
        <path id="third"
          d="M46.7646 2.74588C48.6308 1.16205 51.3692 1.16205 53.2354 2.74588L82.9182 27.9379C86.4667 30.9494 84.337 36.75 79.6829 36.75H20.3171C15.663 36.75 13.5333 30.9494 17.0818 27.9379L46.7646 2.74588Z"
        />
      </svg>
    </div>
    `).promise().then(() => {

    $(".scrollToTop").fadeOut();

    $(document).scroll(function () {
      if ($(this).scrollTop() ?? 0 > 100) {
        $(".scrollToTop").fadeIn();
      } else {
        $(".scrollToTop").fadeOut();
      }
    });

    $(".scrollToTop").click(function () {
      $("html, body").animate({ scrollTop: 0 }, 400);
      return false;
    });
  });

}