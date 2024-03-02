import Notice from "../Models/noticeModel.js";

export const addNewNotice = async (req, res) => {
  try {
    const notice = new Notice(req.body);
    await notice.save();
    res.status(201).json(notice);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error on adding new Notice: Error => ${error}` });
  }
};

export const getActiveNotice = async (req, res) => {
  try {
    const activeNotice = await Notice.find({ isActive: true });
    if (!activeNotice) {
      return res.status(404).json({});
    }

    res.status(200).json(activeNotice);
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const updateNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!notice) {
      res.status(401).send();
    }
    res.status(202).send(notice);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteNotice = async (req, res) => {
  try {
    const { _id } = req.params;
    const notice = await Notice.deleteOne({_id});
    if (notice.deletedCount === 1) {
      res
        .status(200)
        .json({ message: `Successfully deleted the notice \n${notice.data}` });
    } else {
      res.status(200).json({ message: `Notice with id ${_id} doesn't found` });
    }
  } catch (error) {
    res
      .status(500)
      .send({
        message: `Error in deleting Notice (inside on controller) ${error}`,
      });
  }
};

export const toggleNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      res.status(404).send({ message: `Notice not found` });
    }

    const noticeUpdate = await Notice.findByIdAndUpdate(
      req.params.id,
      { isActive: !notice.isActive },
      { new: true }
    );

    return res
      .status(200)
      .send({ message: `Successfully activated`, notice: noticeUpdate });
  } catch (error) {
    res.status(500).send(error);
  }
};
