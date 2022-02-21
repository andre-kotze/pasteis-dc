<?php
    $strQry="SELECT * FROM pasteis.routes_map";

    $db=new PDO('pgsql:host=http://136.159.119.20;port=5432;dbname=u04db;','u04','702');
    $sql = $db->query($strQry);
    $features=[];
    while ($row = $sql->fetch(PDO::FETCH_ASSOC)) {
        $feature=['type'=>'Feature'];
        $feature['geometry']=json_decode($row['geom']);
        unset($row['geom']);
        $feature['properties']=$row;
        array_push($features, $feature);
    }
    $featureCollection=['type'=>'FeatureCollection', 'features'=>$features];
    echo json_encode($featureCollection);
?>
