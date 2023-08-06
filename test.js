const highlightHTMLContent = require("./highlightHTMLContent"); // Replace with the path to your actual highlightHTMLContent function file

describe("highlightHTMLContent", () => {
  it("Test Case 1 : Simple Check", () => {
    const htmlcontent =
      "<p><span > Hi<br> David<br><br>Headline<br>: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects...</span></p>";
    const plaintext =
      " Hi David Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects...";

    const plaintextPositions = [
      { start: 4, end: 9 },
      { start: 20, end: 27 },
    ];

    const expected =
      "<p><span > Hi<br> <mark>David</mark><br><br>Headline<br>: <mark>Energix</mark> Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects...</span></p>";

    const result = highlightHTMLContent(
      htmlcontent,
      plaintext,
      plaintextPositions
    );
    expect(result).toEqual(expected);
  }),
    it("Test Case 2 : Medium Check", () => {
      const htmlcontent =
        '<p><span>Hi David<br><br>Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects<br><br>Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar…<br><br>Read the full article <a href="https://content.seleritycorp.com/hosted/assets/www/UKMW47_hYz_RGzPSpHm44Hi1L49HdNBhs1OkKKW2OPI">here</a><br><br>-------------------------------------<br><br>You received this because you are subscribed to news related to <a href="https://iris.steeleye.co/market/instruments?search=ES0113900J37">ES0113900J37</a>, and this story was marked as 82% relevant.<br><br>Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. <br><br>To unsubscribe change your email preferences, please click <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">here</a>.<br><br>-------------------------------------<br><br><img src="https://context.seleritycorp.com/selerity/assets/sc_icons/pressRelease.png" alt="Rick Astley" style="width:100px;height:100px;"></span></p>';
      const plaintext =
        "Hi David Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar… Read the full article here ------------------------------------- You received this because you are subscribed to news related to ES0113900J37 , and this story was marked as 82% relevant. Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. To unsubscribe change your email preferences, please click here . -------------------------------------";

      const plaintextPositions = [
        {
          start: 241,
          end: 247,
        },
        {
          start: 518,
          end: 525,
        },
        {
          start: 39,
          end: 46,
        },
      ];

      const expected =
        '<p><span>Hi David<br><br>Headline: Energix Closes $520 <mark>Million</mark> Financing and Tax Equity Deal to Fund New Solar Projects<br><br>Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility <mark>Equity</mark> scale solar…<br><br>Read the full article <a href="https://content.seleritycorp.com/hosted/assets/www/UKMW47_hYz_RGzPSpHm44Hi1L49HdNBhs1OkKKW2OPI">here</a><br><br>-------------------------------------<br><br>You received this because you are subscribed to news related to <a href="https://iris.steeleye.co/market/instruments?search=ES0113900J37">ES0113900J37</a>, and this story was marked as 82% relevant.<br><br>Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | <mark>Privacy</mark> Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. <br><br>To unsubscribe change your email preferences, please click <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">here</a>.<br><br>-------------------------------------<br><br><img src="https://context.seleritycorp.com/selerity/assets/sc_icons/pressRelease.png" alt="Rick Astley" style="width:100px;height:100px;"></span></p>';

      const result = highlightHTMLContent(
        htmlcontent,
        plaintext,
        plaintextPositions
      );
      expect(result).toEqual(expected);
    }),
    it("Test Case 3 : Multi Check", () => {
      const htmlcontent =
        "<p><span>Hi Dav<br>id<br><br>Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects...</span></p>";
      const plaintext =
        "Hi David Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects...";

      const plaintextPositions = [
        { start: 3, end: 8 },
        { start: 19, end: 26 },
        { start: 89, end: 99 },
        { start: 107, end: 118 },
      ];

      const expected =
        "<p><span>Hi <mark>Dav<br>id</mark><br><br>Headline: <mark>Energix</mark> Closes $520 Million Financing and Tax Equity Deal to Fund New <mark>Solar Proj</mark>ects...</span></p>";

      const result = highlightHTMLContent(
        htmlcontent,
        plaintext,
        plaintextPositions
      );
      expect(result).toEqual(expected);
    }),
    it("Test Case 4 : Invalid htmlContent (empty)", () => {
      const htmlContent = "";
      const plainText =
        "Hi David Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects...";
      const plainTextPositions = [
        { start: 3, end: 8 },
        { start: 19, end: 26 },
        { start: 89, end: 99 },
        { start: 107, end: 118 },
      ];

      expect(() => {
        highlightHTMLContent(htmlContent, plainText, plainTextPositions);
      }).toThrow("htmlContent must be a non-empty string");
    }),
    it("Test Case 5 : Invalid plainText (empty)", () => {
      const htmlContent =
        "<p><span>Hi Dav<br>id<br><br>Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects...</span></p>";
      const plainText = "";
      const plainTextPositions = [
        { start: 3, end: 8 },
        { start: 19, end: 26 },
        { start: 89, end: 99 },
        { start: 107, end: 118 },
      ];

      expect(() => {
        highlightHTMLContent(htmlContent, plainText, plainTextPositions);
      }).toThrow("plainText must be a non-empty string");
    }),
    it("Test Case 6 : Invalid plainTextPositions (object with non-number start or end)", () => {
      const htmlContent =
        "<p><span>Hi Dav<br>id<br><br>Headline: Energix Closes 520MillionFinancingandTaxEquityDealtoFundNewSolarProjects...</span></p>′;constplainText=′HiDavidHeadline:EnergixCloses520MillionFinancingandTaxEquityDealtoFundNewSolarProjects...</span></p>′;constplainText=′HiDavidHeadline:EnergixCloses520 Million Financing and Tax Equity Deal to Fund New Solar Projects...";
      const plainText = null;
        const plainTextPositions = [
        { start: 3, end: 8 },
        { start: 19, end: 26 },
        { start: 89, end: "99" }, // Non-number end property
        { start: 107, end: 118 },
      ];
      
      expect(() => {
        highlightHTMLContent(htmlContent, plainText, plainTextPositions);
      }).toThrow(
        'plainText must be a non-empty string'
      );
    }),
    it("Actual Case : Assignment Check", () => {
      const htmlcontent =
        '<p><span>Hi David<br><br>Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects<br><br>Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar…<br><br>Read the full article <a href="https://content.seleritycorp.com/hosted/assets/www/UKMW47_hYz_RGzPSpHm44Hi1L49HdNBhs1OkKKW2OPI">here</a><br><br>-------------------------------------<br><br>You received this because you are subscribed to news related to <a href="https://iris.steeleye.co/market/instruments?search=ES0113900J37">ES0113900J37</a>, and this story was marked as 82% relevant.<br><br>Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. <br><br>To unsubscribe change your email preferences, please click <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">here</a>.<br><br>-------------------------------------<br><br><img src="https://context.seleritycorp.com/selerity/assets/sc_icons/pressRelease.png" alt="Rick Astley" style="width:100px;height:100px;"></span></p>';
      const plaintext =
        "Hi David Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar… Read the full article here ------------------------------------- You received this because you are subscribed to news related to ES0113900J37 , and this story was marked as 82% relevant. Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. To unsubscribe change your email preferences, please click here . -------------------------------------";

      const plaintextPositions = [
        {
          start: 241,
          end: 247,
        },
        {
          start: 518,
          end: 525,
        },
      ];

      const expected =
        '<p><span>Hi David<br><br>Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects<br><br>Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility <mark>Equity</mark> scale solar…<br><br>Read the full article <a href="https://content.seleritycorp.com/hosted/assets/www/UKMW47_hYz_RGzPSpHm44Hi1L49HdNBhs1OkKKW2OPI">here</a><br><br>-------------------------------------<br><br>You received this because you are subscribed to news related to <a href="https://iris.steeleye.co/market/instruments?search=ES0113900J37">ES0113900J37</a>, and this story was marked as 82% relevant.<br><br>Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | <mark>Privacy</mark> Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. <br><br>To unsubscribe change your email preferences, please click <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">here</a>.<br><br>-------------------------------------<br><br><img src="https://context.seleritycorp.com/selerity/assets/sc_icons/pressRelease.png" alt="Rick Astley" style="width:100px;height:100px;"></span></p>';

      const result = highlightHTMLContent(
        htmlcontent,
        plaintext,
        plaintextPositions
      );
      console.log(result);
      expect(result).toEqual(expected);
    });
});
