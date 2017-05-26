<?php 
  function getDirectoryList($dir,$recursive = FALSE) {
    if (is_dir($dir)) {
		for ($list = array(),$handle = opendir($dir); (FALSE !== ($file = readdir($handle)));) {
			if (($file != '.' && $file != '..') && (file_exists($path = $dir.'/'.$file))) {
				if (is_dir($path) && ($recursive)) {
					$list = array_merge($list, process_dir($path, TRUE));
				} else {
					$entry = array('filename' => $file, 'dirpath' => $dir);

					//---------------------------------------------------------//
					//                     - SECTION 1 -                       //
					//          Actions to be performed on ALL ITEMS           //
					//-----------------    Begin Editable    ------------------//

					$entry['modtime'] = filemtime($path);

					//-----------------     End Editable     ------------------//
					do if (!is_dir($path)) {
						//---------------------------------------------------------//
						//                     - SECTION 2 -                       //
						//         Actions to be performed on FILES ONLY           //
						//-----------------    Begin Editable    ------------------//

						$entry['size'] = filesize($path);
						if (strstr(pathinfo($path,PATHINFO_BASENAME),'log')) {
							if (!$entry['handle'] = fopen($path,r)) $entry['handle'] = "FAIL";
						}
						 
						//-----------------     End Editable     ------------------//
						break;
					} else {
						//---------------------------------------------------------//
						//                     - SECTION 3 -                       //
						//       Actions to be performed on DIRECTORIES ONLY       //
						//-----------------    Begin Editable    ------------------//

						//-----------------     End Editable     ------------------//
						break;
					} while (FALSE);
					$list[] = $entry;
				}
			}
		}
		closedir($handle);
		return $list;
    } else return FALSE;
  }
  
header('Content-type: text/cache-manifest');
?>
CACHE MANIFEST
# 2013-12-03:v1

CACHE:
index.html
<?php 
$files = getDirectoryList($_SERVER['DOCUMENT_ROOT'].'css/images/');
foreach ($files as $f) {
   echo "
css/images/" . $f['filename'];
}
?>

css/app.css
css/CenturyGothic.ttf

js/app.js
js/jquery.min.js

<?php 
$files = getDirectoryList($_SERVER['DOCUMENT_ROOT'].'media/audio/');
foreach ($files as $f) {
   echo "
media/audio/" . $f['filename'];
}
?>
