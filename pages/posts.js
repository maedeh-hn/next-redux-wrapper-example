import axios from "axios";
import { useEffect, useState } from "react";

const Posts = ({ ssr, postsData }) => {
    const [posts, setPosts] = useState(postsData);

    useEffect(() => {
        if (!ssr && posts === null) {
            axios.get(
                `https://jsonplaceholder.typicode.com/users/${Math.floor(Math.random() * 10 + 1)}`
              ).then((res)=>{setPosts(res.data)})
           ;
        }
        
    }, [ssr, posts]);
    // if (posts === null) {
    //     return <div>Loading...</div>;
    // }
    console.log(posts);
    return (
       
    <div>
      
        <p>Page for posts with dynamice rendring</p>
        <p>{posts?.name}</p>
        {/* <p>{posts?.username}</p>
        <p>{posts?.email}</p>
        <p>{posts?.address?.street}</p> */}
       <button onClick={()=>console.log("Hi baby")}>click me</button>
    </div>)
};

export default Posts;

export const getServerSideProps =async ({ req }) => {
    const userAgent = req.headers["user-agent"];

    const botPattern =
        "(googlebot/|bot|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)";
    const re = new RegExp(botPattern, "i");
    let ssr = false;
    if (re.test(userAgent)) {
        ssr = true;
    }
   
    let postsData=null
    if (ssr) {
        // is ssr === true => fetch data from SSR =>
        const { data } = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${Math.floor(Math.random() * 10 + 1)}`
          );

      postsData = data
      console.log(postsData);
    }
    return {
        props: {
            ssr,
            postsData,
        },
    };
};